# Unsur Enhancement Plan

## Summary

Goal: turn the periodic-table viewer into a richer learning tool by improving discovery, interactivity, accessibility, and educational depth. The following enhancements are grouped by theme so implementation work can be scheduled incrementally.

## Enhancements

### Search & Filters

- Add a global search bar that filters tiles in real time.
- Include quick filters for category, period, group, and phase.
- Highlight matching tiles, show match counts, and provide “clear filters” UX.

### Property Heatmaps

- Let users switch the table’s color scheme between properties (atomic number, electronegativity, melting point, etc.).
- Use gradients with legends and transitions to illustrate periodic trends.

### Comparison Drawer

- Allow pinning multiple elements and viewing a comparison grid of properties, images, and electron configurations.
- Reuse the existing sidebar layout or add a bottom sheet on mobile.

### Learning Modes

- Introduce quizzes/challenges (identify elements by clues, guess atomic numbers, etc.) with scoring and progress.
- Surface historical or contextual hints to reinforce learning.

### Discovery Timeline

- Add a timeline view that filters elements by discovery year/scientist.
- Provide richer metadata (e.g., notable experiments, geography).

### Temperature Simulation

- Use the existing temperature helpers to add a slider that shows each element’s state of matter at the selected temperature.
- Update tile styling and legend dynamically.

### Enhanced 3D/AR Models

- Expand the `Atom Model` tab with higher fidelity 3D visualizations or external embeds (Sketchfab, WebGL).
- Allow rotation/zoom and optional augmented-reality links.

### Accessibility Upgrades

- Provide color-blind friendly palettes, keyboard navigation, and textual summaries of periodic trends.
- Ensure interactive components meet WCAG focus/contrast guidelines.

### Real-world Data Integrations

- Optionally integrate APIs for market prices, abundance, common uses, or safety notes.
- Present the data in contextual panels with source attribution.

### PWA & Offline Support

- Convert the app into a Progressive Web App with caching for data and assets.
- Enable installation on devices for offline classroom use.

## Next Steps

1. Prioritize initiatives with stakeholders (education focus vs. visualization tech).
2. Break selected themes into epics/tickets with design mocks and data requirements.
3. Prototype search/filter and heatmap features first—they unlock other improvements.
4. Validate UX with educators or target users, then iterate and expand.
