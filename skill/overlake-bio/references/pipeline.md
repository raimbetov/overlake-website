# Technology

## ECM Aging Atlas

<https://ecm-atlas.fly.dev> hosts the live knowledgebase of time-resolved matrisome
signatures extracted from public proteomic datasets. See `projects.md` §3 for
scope and the proposal DOI.

## Legacy *in silico* enzyme engineering pipeline

<https://overlake.notion.site/pipeline-4e89ae4eaf734d0fa13b17c6793cc0cb>
· archived: <https://perma.cc/4PKL-V6MP>

**Marked by the author as the legacy pipeline.** It describes the approach as run,
not necessarily the current stack. Treat tool choices as historical.

### Goal

Recommend amino-acid substitutions for a chosen enzyme to produce a variant with
binding activity and desired function against a target substrate. Requirements:

- generate **foldable** sequences
- guarantee high binding activity on the target substrate
- preserve the function of the starting enzyme
- achieve this with a **small library**, to minimize wet-lab work

Because substrate binding alone does not translate to catalytic efficiency, a
parallel track optimizes for **k_cat** (turnover number). Screening on both
affinity and turnover filters out non-optimal variants.

The strategic point: replace conventional high-throughput screening — as in a
typical directed-evolution workflow — with computational variant generation and
sorting, doing most of the work *in silico*. This cuts wet-lab validation from
thousands of variants to a few dozen, and R&D cost with it.

### Proof of concept

Computationally design a more efficient human **glyoxalase I** (Glo1, EC
`4.4.1.5`), then validate predicted candidates in the lab. Active-site residues
are mutated and variants tested for improved affinity toward the substrate
**S-lactoylglutathione**.

### Stages

| # | Stage | Tooling |
|---|---|---|
| 1 | Point mutation generation | **ProtBERT** (masked-residue prediction) |
| 2 | Sequence folding | **AlphaFold** via **ColabFold** |
| 3 | Protein–ligand docking | **DiffDock** (also `plex` from LabDAO) |
| 4 | Binding affinity scoring | **AutoDock Vina** |
| 5 | Selection for *in vitro* testing | ranked by Vina score |

### Concrete parameters

- **Active-site identification:** PrankWeb (<https://prankweb.cz>), input `7WT1.pdb`
- **Predicted pocket residues:** `A_101, A_103, A_33, A_35, A_37, A_60, A_62,
  A_65, A_67, A_69, A_71, A_92, A_99, B_118, B_122, B_126, B_150, B_157, B_160,
  B_162, B_170, B_172, B_179, B_182, B_183`
- **Pocket center:** `(-9.2, -11.2, -7.5)`
- **Point-mutation output:** 227 sequences generated
- **Vina score:** preliminary results around **−5.5 kcal/mol**; target **−7**
  (lower = stronger predicted binding)

### Approaches to sequence design

Three families are described: point mutations, protein-family generation, and
*de novo* function-conditioned generation. The project **starts with point
mutations** (pre-trained ProtBERT) and continues toward family generation, which
requires fine-tuning on a family sequence dataset. Family generation and *de novo*
enzyme generation are marked **under development**, as is the k_cat optimization
track.

> Raw output artifacts for these stages live on Google Drive links in the source
> Notion page. They are omitted here deliberately; they are operational files,
> not knowledge, and are best reached through the page itself.
