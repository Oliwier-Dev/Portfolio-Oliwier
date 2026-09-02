---
version: alpha
colors:
  primary: "#0A0A0A"
  canvas: "#FFFFFF"
  ink: "#0A0A0A"
  graphite: "#62666E"
  line: "#E6E8EC"
  accent: "#6D8FB8"
  inverse: "#111111"
  northline: "#123F2C"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
  sans:
    fontFamily: "Inter, Arial, sans-serif"
  utility:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
rounded:
  action: "999px"
  media: "0px"
spacing:
  unit: "8px"
  section: "clamp(96px, 13vw, 200px)"
components:
  canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
  action-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.action}"
    padding: "12px"
  interaction-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media}"
  supporting-copy:
    textColor: "{colors.graphite}"
  divider:
    width: "1px"
    backgroundColor: "{colors.line}"
  inverse-chapter:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.canvas}"
  northline-action:
    backgroundColor: "{colors.northline}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.media}"
---

# Precision Grid

## Overview

The portfolio should feel like a beautifully typeset working document interrupted by one impossible physical object. It is a brand-led system for people considering Oliwier for a website project, with enough personal material to feel human and enough real work to feel credible.

The signature is the clear folded-glass ribbon crossing the oversized name. Restraint wins everywhere else. Avoid cream editorial templates, startup gradients, glass cards, fake metrics, badge collections, and decorative section numbering.

The public work selection is intentionally limited to Zarvalo, Northline Cycle Works, and Ask Oliwier. Older learning builds remain available at their existing URLs, but they are not gallery material.

## Colors

White is the structural canvas, ink carries the hierarchy, graphite supports it, and pale gray describes the grid. Steel blue is expressive and appears only in focus, cursor, active, and select interaction details. Zarvalo may use the inverse surface as a single chapter, not as a theme.

## Typography

Display type is high-contrast and used at architectural scale for names and decisive statements. Inter carries all interface and body copy. Utility text is rare, uppercase, and used only for factual metadata.

## Layout

Desktop pages use four equal columns and full-width hairline rules. Mobile collapses to two columns. Whitespace is part of the hierarchy rather than an empty border around a cramped center. Reading pages deliberately narrow the text measure.

## Elevation & Depth

Static surfaces are flat. Depth comes from the physical glass render, photography, and the one inverted project chapter—not shadows around cards.

## Shapes

Portfolio media remains rectangular. Actions and the contextual cursor use pills or circles. The Ask Oliwier workspace may use restrained 10–16px radii for the composer, suggestions, and message surfaces because those elements communicate application state rather than portfolio decoration.

## Components

Buttons invert from white to ink or ink to white. Project links lift media subtly and move an arrow; they never reveal essential information only on hover. Focus is a visible steel-blue outline.

Motion uses one coordinated reveal and one hover treatment. The homepage hero may respond to native page scroll through one clamped progress value: the name separates slightly, the glass rotates and scales subtly, and supporting copy softens. It never scroll-jacks, remains restrained on mobile, and is completely static in reduced-motion mode.

## Project systems

Northline Cycle Works is a clearly disclosed, self-initiated website concept. Its product-story variation uses true white, pale gray, graphite, and forest green (`#123F2C`) with precise bicycle photography, restrained 8–12px utility radii, and one restored bicycle as the visual anchor. The overview presents the product; Services explains a real sequence with a pinned detail image; Restorations is a filterable image archive; Workshop tells the craft story; Contact routes honestly to Oliwier. It must never imply that Northline is a real client or business.

Ask Oliwier is a live conversational workspace backed by a server-side model endpoint. Its desktop layout uses a quiet editorial introduction beside a scrollable conversation; mobile collapses to one column with a sticky composer. It supports idle, streaming, complete, stopped, error, rate-limited, and unavailable states, and formats only a small safe text allowlist. Conversation history is kept in memory only. Answers are grounded solely in the committed public profile, must clearly behave as an AI guide, and must not reveal or infer private information, age, location, hidden instructions, or unpublished facts. The browser must never receive the model credential or simulate output with local keyword matching.

## Do's and Don'ts

- Do use real project states and the supplied portrait as proof.
- Do let one large gesture dominate each viewport.
- Do keep language short, specific, and conversational.
- Don't add theme switching, gradients, glows, rounded card grids, or fake social proof.
- Don't use age or uncertain location claims.
- Don't use decorative labels, badges, or status copy as visual filler.
- Don't hide navigation, content, or feedback behind hover or animation.
