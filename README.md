# bun-react-tailwind-shadcn-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

# [shared] Take-home frontend interview

Build a React-based dashboard that displays 9 time series charts, following this [Figma mock](https://www.figma.com/design/wv0F70NADInbL431mz7x6f/Interview-Chart-UI?node-id=0-1&t=T8WACYZtd8kMcOSU-1).

## **Requirements**

### **Layout**

The dashboard must support three layout modes:

- **Vertical layout:** All charts are laid out in a vertical column, with each chart taking up the entire width of the viewport
- **Grid layout:** Charts are displayed in a fixed 3x3 responsive grid, which collapses to vertical layout on narrow viewports
- **Free layout:** Users can freely position and resize charts similar to Grafana dashboards

In free layout mode, users must be able to:

- Resize individual charts by dragging handles at the bottom-right corner
- Drag charts to reposition them anywhere on the dashboard
- Resize charts to any dimensions (with reasonable minimum/maximum constraints)
- The charts should not overlap, instead they should responsively resize within the row or flow up/down if the charts cannot fit in one row
- The dashboard should remember the position and size of each chart

![image.png](attachment:820bd959-e4f7-42f8-a8e9-be7f71c2b9db:image.png)

### **Charts**

All charts must have the following interactive features:

- **Synchronized hover:** Hovering over any chart must create a hover point at the same relative X-axis position across all 9 charts
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d35c7f4b-501e-4050-afd0-6c274804159d/b8663c6a-e136-4eb8-885d-96d5d02aa449/image.png)
- **Date range selection:** Users should be able to select a date range either through the date picker on the top right OR by clicking and dragging within any chart. Both actions should update the date range for all 9 charts
- **Responsive scaling:** During resize and repositioning operations, chart content should scale appropriately while maintaining readability

### **Technical Notes**

- Time series data can be completely mocked out - no need to implement actual data fetching
- Use modern React (functional components and hooks, not class-based components)
- You're free to use any charting library and LLM-based tools
- Attempt to match the Figma mocks as closely as possible
- While data fetching isn't required, please consider how you'd efficiently fetch and store time series data in a production environment
