#!/usr/bin/env python3
"""
Academic HTML Builder
Builds HTML files from YAML metadata and content using Jinja2 templates.
Enhanced version with comprehensive field handling and validation.
"""

import sys
import os
import yaml
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from datetime import datetime
import re

def validate_metadata(metadata):
    """Validate metadata with comprehensive field checking."""
    # Required fields
    required_fields = ['title', 'authors', 'description', 'date']
    missing_required = []
    
    for field in required_fields:
        if field not in metadata or not metadata[field]:
            missing_required.append(field)
    
    if missing_required:
        print(f"Error: Missing required fields: {', '.join(missing_required)}")
        return False
    
    # Validate authors is a list
    if not isinstance(metadata['authors'], list):
        print("Error: 'authors' must be a list")
        return False
    
    # Validate date format
    try:
        datetime.strptime(metadata['date'], '%Y-%m-%d')
    except ValueError:
        print("Error: 'date' must be in YYYY-MM-DD format")
        return False
    
    # Check for commonly used optional fields
    important_optional = ['doi', 'pdf_url', 'url', 'keywords']
    missing_important = [f for f in important_optional if f not in metadata or not metadata[f]]
    if missing_important:
        print(f"Warning: Important optional fields missing: {', '.join(missing_important)}")
    
    # Check for publication venue (should have at least one)
    venues = ['journal', 'conference', 'publisher', 'arxiv_id']
    if not any(metadata.get(venue) for venue in venues):
        print("Warning: No publication venue specified (journal, conference, publisher, or arxiv_id)")
    
    # Validate DOI format if present
    if metadata.get('doi'):
        doi_pattern = r'^10\.\d{4,}/.*'
        if not re.match(doi_pattern, metadata['doi']):
            print(f"Warning: DOI '{metadata['doi']}' may not be in standard format (10.xxxx/...)")
    
    # Validate URLs if present
    url_fields = ['pdf_url', 'url', 'arxiv_url']
    for field in url_fields:
        if metadata.get(field) and not metadata[field].startswith(('http://', 'https://')):
            print(f"Warning: {field} should start with http:// or https://")
    
    return True

def enhance_metadata(metadata, output_file):
    """Add auto-generated fields and enhancements."""
    # Auto-generate canonical URL if base_url is provided but url is not
    if 'base_url' in metadata and 'url' not in metadata:
        base_url = metadata['base_url'].rstrip('/')
        filename = Path(output_file).name
        metadata['url'] = f"{base_url}/{filename}"
        print(f"Auto-generated URL: {metadata['url']}")
    
    # Auto-generate PDF URL if pdf_filename is provided
    if 'pdf_filename' in metadata and 'pdf_url' not in metadata and 'base_url' in metadata:
        base_url = metadata['base_url'].rstrip('/')
        metadata['pdf_url'] = f"{base_url}/{metadata['pdf_filename']}"
        print(f"Auto-generated PDF URL: {metadata['pdf_url']}")
    
    # Auto-generate arXiv URL if arxiv_id is provided
    if 'arxiv_id' in metadata and 'arxiv_url' not in metadata:
        metadata['arxiv_url'] = f"https://arxiv.org/abs/{metadata['arxiv_id']}"
        print(f"Auto-generated arXiv URL: {metadata['arxiv_url']}")
    
    # Auto-generate DOI URL if DOI is provided
    if metadata.get('doi') and not metadata.get('doi_url'):
        metadata['doi_url'] = f"https://doi.org/{metadata['doi']}"
    
    return metadata

def load_file(filepath, file_type="text"):
    """Load a file with proper error handling."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            if file_type == "yaml":
                return yaml.safe_load(f)
            else:
                return f.read()
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found")
        return None
    except yaml.YAMLError as e:
        print(f"Error parsing YAML file '{filepath}': {e}")
        return None
    except Exception as e:
        print(f"Error reading file '{filepath}': {e}")
        return None

def show_template_fields():
    """Show all available template fields."""
    print("\nAvailable template fields:")
    print("Required:")
    print("  - title: Paper title")
    print("  - authors: List of author names")
    print("  - description: Abstract or description")
    print("  - date: Publication date (YYYY-MM-DD)")
    print("\nPublication Info:")
    print("  - doi: DOI identifier")
    print("  - journal: Journal name")
    print("  - conference: Conference name")
    print("  - publisher: Publisher name")
    print("  - volume: Journal volume")
    print("  - issue: Journal issue")
    print("  - pages: Page range (e.g., '123-145')")
    print("\nLinks:")
    print("  - url: Canonical URL")
    print("  - pdf_url: Direct link to PDF")
    print("  - arxiv_url: arXiv paper URL")
    print("  - arxiv_id: arXiv ID (auto-generates arxiv_url)")
    print("\nMeta:")
    print("  - keywords: Comma-separated keywords")
    print("  - affiliations: List of author affiliations")
    print("  - image: Social media image URL")
    print("\nAuto-generation helpers:")
    print("  - base_url: Base URL (generates url and pdf_url)")
    print("  - pdf_filename: PDF filename (with base_url, generates pdf_url)")

def main():
    """Main build function."""
    if len(sys.argv) == 2 and sys.argv[1] in ['--help', '-h']:
        print("Academic HTML Builder")
        print("Usage: python build.py metadata.yaml content.html output.html")
        print("       python build.py --fields  (show available fields)")
        show_template_fields()
        sys.exit(0)
    
    if len(sys.argv) == 2 and sys.argv[1] == '--fields':
        show_template_fields()
        sys.exit(0)
    
    if len(sys.argv) != 4:
        print("Usage: python build.py metadata.yaml content.html output.html")
        print("       python build.py --help")
        sys.exit(1)

    metadata_file, content_file, output_file = sys.argv[1:4]
    
    # Verify input files exist
    for filepath in [metadata_file, content_file]:
        if not os.path.exists(filepath):
            print(f"Error: Input file '{filepath}' does not exist")
            sys.exit(1)

    print(f"Loading metadata from {metadata_file}...")
    metadata = load_file(metadata_file, "yaml")
    if metadata is None:
        sys.exit(1)

    print(f"Loading content from {content_file}...")
    content = load_file(content_file, "text")
    if content is None:
        sys.exit(1)

    print("Validating metadata...")
    if not validate_metadata(metadata):
        sys.exit(1)

    print("Enhancing metadata...")
    metadata = enhance_metadata(metadata, output_file)

    # Look for template files
    script_dir = Path(__file__).parent
    template_files = ["template.html", "template_v3.html"]
    template_path = None
    
    for template_name in template_files:
        candidate = script_dir / template_name
        if candidate.exists():
            template_path = candidate
            break
    
    if template_path is None:
        print(f"Error: No template file found. Looking for: {', '.join(template_files)}")
        print(f"Make sure one of these files exists in {script_dir}")
        sys.exit(1)

    print(f"Using template: {template_path.name}")
    print("Rendering HTML...")
    
    try:
        # Setup Jinja2 environment
        env = Environment(
            loader=FileSystemLoader(str(script_dir)),
            trim_blocks=True,
            lstrip_blocks=True
        )
        template = env.get_template(template_path.name)

        # Render the final HTML
        rendered = template.render(**metadata, content=content)

        # Create output directory if it doesn't exist
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Write the output file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(rendered)

        print(f"Successfully built {output_file}")
        print(f"Document stats:")
        print(f"   - Title: {metadata['title']}")
        print(f"   - Authors: {len(metadata['authors'])}")
        print(f"   - Content size: {len(content):,} characters")
        print(f"   - Output size: {len(rendered):,} characters")
        
        # Show populated fields
        populated_fields = [k for k, v in metadata.items() if v and k != 'content']
        print(f"   - Metadata fields: {len(populated_fields)}")

    except Exception as e:
        print(f"Error rendering template: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()