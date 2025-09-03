#!/usr/bin/env python3
"""
Academic HTML Builder
Builds HTML files from YAML metadata and content using Jinja2 templates.
"""

import sys
import os
import yaml
from jinja2 import Environment, FileSystemLoader
from pathlib import Path

def validate_metadata(metadata):
    """Validate that required metadata fields are present."""
    required_fields = ['title', 'authors', 'description', 'date']
    missing_fields = []
    
    for field in required_fields:
        if field not in metadata or not metadata[field]:
            missing_fields.append(field)
    
    if missing_fields:
        print(f"❌ Error: Missing required fields: {', '.join(missing_fields)}")
        return False
    
    # Validate authors is a list
    if not isinstance(metadata['authors'], list):
        print("❌ Error: 'authors' must be a list")
        return False
    
    return True

def load_file(filepath, file_type="text"):
    """Load a file with proper error handling."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            if file_type == "yaml":
                return yaml.safe_load(f)
            else:
                return f.read()
    except FileNotFoundError:
        print(f"❌ Error: File '{filepath}' not found")
        return None
    except yaml.YAMLError as e:
        print(f"❌ Error parsing YAML file '{filepath}': {e}")
        return None
    except Exception as e:
        print(f"❌ Error reading file '{filepath}': {e}")
        return None

def main():
    """Main build function."""
    if len(sys.argv) != 4:
        print("Usage: python build.py metadata.yaml content.html output.html")
        print("")
        print("Example:")
        print("  python build.py metadata.yaml cleaned.html index.html")
        sys.exit(1)

    metadata_file, content_file, output_file = sys.argv[1:4]
    
    # Verify input files exist
    for filepath in [metadata_file, content_file]:
        if not os.path.exists(filepath):
            print(f"❌ Error: Input file '{filepath}' does not exist")
            sys.exit(1)

    print(f"📖 Loading metadata from {metadata_file}...")
    metadata = load_file(metadata_file, "yaml")
    if metadata is None:
        sys.exit(1)

    print(f"📄 Loading content from {content_file}...")
    content = load_file(content_file, "text")
    if content is None:
        sys.exit(1)

    print("🔍 Validating metadata...")
    if not validate_metadata(metadata):
        sys.exit(1)

    # Look for template.html in the same directory as the script
    script_dir = Path(__file__).parent
    template_path = script_dir / "template.html"
    
    if not template_path.exists():
        print(f"❌ Error: Template file 'template.html' not found in {script_dir}")
        print("Make sure template.html is in the same directory as build.py")
        sys.exit(1)

    print("🔨 Rendering HTML...")
    try:
        # Setup Jinja2 environment
        env = Environment(
            loader=FileSystemLoader(str(script_dir)),
            trim_blocks=True,
            lstrip_blocks=True
        )
        template = env.get_template("template.html")

        # Render the final HTML
        rendered = template.render(**metadata, content=content)

        # Create output directory if it doesn't exist
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Write the output file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(rendered)

        print(f"✅ Successfully built {output_file}")
        print(f"📊 Document stats:")
        print(f"   - Title: {metadata['title']}")
        print(f"   - Authors: {len(metadata['authors'])}")
        print(f"   - Content size: {len(content):,} characters")
        print(f"   - Output size: {len(rendered):,} characters")

    except Exception as e:
        print(f"❌ Error rendering template: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()