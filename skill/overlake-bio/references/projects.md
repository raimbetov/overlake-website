# Projects

Five projects in the pipeline. Tags mark the dominant method: **Data**, **AI**,
or **Cell biology**. All descend from the ECM-first position set out in
`theory.md`.

---

## 1. The Spacefarer Phenome · Data

<https://overlake.notion.site/Spacefarer-phenome-6df641ad372c4ac5a64b8a666d30a179>

The **Spacefarer Phenome** is the concept of an optimized collection of human
phenotypic traits, dictated by genetics, specifically adapted for the rigors of
space exploration and life in extraterrestrial environments. It covers
identifying or engineering these traits to **enhance human resilience against
space-related challenges** — increased radiation, microgravity, isolation —
aiming to improve the feasibility and sustainability of long-duration missions
and off-world colonization.

The Notion page frames this as needing **multidisciplinary teams** spanning
genetics, medicine, aerospace engineering, and ethics.

Decks: [project deck](https://overlake.bio/pdf/spacefarer-phenome-deck-v3-resized.pdf)
· [pilot deck](https://overlake.bio/pdf/spacefarer-phenome-bwc.pdf), built for the
*Built with Claude: Life Sciences* hackathon (July 2026) —
[10.6084/m9.figshare.33072398](https://doi.org/10.6084/m9.figshare.33072398)

---

## 2. Enzyme engineering for crosslinked collagen turnover · AI

<https://overlake.notion.site/Enzyme-engineering-for-crosslinked-collagen-turnover-17f3fc8f169f80079fbfe1fdaed87d0a>

Posits **ECM stiffening as the upstream cause of the hallmarks of aging** and
proposes using generative AI to engineer **matrix metalloproteinases** (MMPs)
capable of degrading sugar-modified (glycated) collagen that resists normal
remodeling.

The aim is to overcome hitherto irreparable damage through engineered ECM
turnover. First therapeutic application: **diabetic nephropathy**, using enhanced
**glyoxalase I** plus **MMP-3** and **MMP-9**, targeting both intracellular and
extracellular glycation damage in kidneys.

Proposal: [10.5281/zenodo.14719968](https://doi.org/10.5281/zenodo.14719968)

---

## 3. The Extracellular Matrix Aging Atlas · Data

<https://overlake.notion.site/Extracellular-matrix-aging-atlas-10e0f2ecd2f545afad43fd971cce5be7>
· Live: <https://ecm-atlas.fly.dev>

A knowledgebase collecting **time-resolved matrisome signatures** extracted from
public proteomic datasets.

The ECM directs cellular function through mechanical and biochemical stimuli, and
its composition changes as a function of age, but there is no unified,
consensual account of those qualitative and quantitative changes. The Atlas
aggregates published datasets into a **database of ECM aging signatures** to show
how ECM composition and its drift affect aging across tissues.

Scale, from the proposal: the **matrisome** comprises **1027 genes** in the human
genome and **1110** in mouse. Any given tissue contains **over 150** ECM and
ECM-associated proteins, with characteristic differences between tissues.
Matrisomic alterations in response to insult can serve as a biomarker for
underlying pathology.

Proposal: [10.55277/researchhub.v2rclb70](https://doi.org/10.55277/researchhub.v2rclb70)
· [PDF](https://overlake.bio/pdf/ecm-atlas-proposal.pdf)
· Deck: [ai-hackathon-slides.pdf](https://overlake.bio/pdf/ai-hackathon-slides.pdf)
— [10.6084/m9.figshare.30454190](https://doi.org/10.6084/m9.figshare.30454190)

---

## 4. Advanced glycation end product (AGE)-degrading enzymes · AI

<https://overlake.notion.site/Advanced-glycation-end-product-AGE-degrading-enzymes-ce317852187b4639b5e5debe42b62290>

Targets tissue stiffening caused by random irreversible chemical damage in the
ECM. The damage takes the form of **crosslinks and adducts**, largely from
accumulated **advanced glycation end products** (AGEs), which are closely linked
to the pathomechanisms of aging.

The proposed solution is a class of specialized enzymes engineered to break these
AGEs down, potentially reversing or mitigating a key contributor to aging. The
Notion page notes that damage to long-lived proteins such as those in the ECM has
been proposed as a **new hallmark of aging**.

Deck: [psi-slides.pdf](https://overlake.bio/pdf/psi-slides.pdf)
· [10.6084/m9.figshare.28103399](https://doi.org/10.6084/m9.figshare.28103399)

---

## 5. Glycation of ribosomes as a driver of proteostasis loss · Cell biology

<https://overlake.notion.site/Glycation-of-ribosomes-as-a-driver-of-proteostasis-loss-d8971d87778846349d8f4fc29a91a30b>

A hypothesis centered on the abundant potential for **glycation within the
ribosome**, proposing that such modification alters the **error rate of protein
synthesis**. Increased error would raise production of improperly folded
polypeptides, opening a previously unexplored route by which **proteostasis** is
compromised.

The mechanism links tightly regulated proteostasis to the *stochastic* nature of
glycation. The project connects translation fidelity to metabolism, aiming at
interventions for extending healthy life and strategies against protein
misfolding pathologies.

Supporting preprint: *Methylglyoxal affects translation fidelity*
· [10.2139/ssrn.4566939](https://dx.doi.org/10.2139/ssrn.4566939)
· Deck: [ribo-slides.pdf](https://overlake.bio/pdf/ribo-slides.pdf)
— [10.6084/m9.figshare.30359905](https://doi.org/10.6084/m9.figshare.30359905).
This is the entry that took **second place** in the 2022 Hypothesis Prize
(see `press.md`).

---

## How they connect

```
        DEATh: ECM crosslinking is upstream of the hallmarks
                          │
      ┌───────────────────┼────────────────────┐
      │                   │                    │
 measure the          clear the           follow the same
 baseline             crosslinks          chemistry inward
      │                   │                    │
 (3) ECM Atlas    (2) MMPs + Glo1        (5) ribosome glycation
                  (4) AGE-degrading           → proteostasis
                      enzymes

 (1) Spacefarer phenome: resilience under extreme conditions,
     the second stated objective alongside lifespan extension
```
