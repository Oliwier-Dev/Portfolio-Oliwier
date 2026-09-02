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

Media remains rectangular. Only actions and the contextual cursor use pills or circles.

## Components

Buttons invert from white to ink or ink to white. Project links lift media subtly and move an arrow; they never reveal essential information only on hover. Focus is a visible steel-blue outline.

Motion uses one coordinated reveal and one hover treatment. Reduced-motion mode removes translation and smooth scrolling while keeping every state understandable.

## Project systems

Northline Cycle Works is a clearly disclosed, self-initiated website concept. It may use warm paper, oxide red, and documentary bicycle photography because it is a project-branded case study rather than part of the portfolio chrome. Its signature is an editorial split screen, large Bodoni headlines, and rectangular imagery. It must never imply that Northline is a real client.

Ask Oliwier is a provider-neutral conversational interface. Until a server-side LLM endpoint is configured, the input stays disabled and the page says so plainly. It must never simulate model output with local keyword matching. A future endpoint may answer only from the committed public profile file and must refuse private or age-related questions.

## Do's and Don'ts

- Do use real project states and the supplied portrait as proof.
- Do let one large gesture dominate each viewport.
- Do keep language short, specific, and conversational.
- Don't add theme switching, gradients, glows, rounded card grids, or fake social proof.
- Don't use age or uncertain location claims.
- Don't use decorative labels, badges, or status copy as visual filler.
- Don't hide navigation, content, or feedback behind hover or animation.
