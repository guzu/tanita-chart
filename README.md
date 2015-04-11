# Tanita Chart
This is a simple grapher (based on [d3.js](http://d3js.org/)) for raw CSV data from Tanita weighing scales and body composition monitors.

Only the **BC-601** (http://www.tanita.com/en/bc601f/) model is supported.

This is a simple web page purely client-side, with CSV parsing and rendering in javascript; which means no data are sent to any server (no cookie, no sign up, ...).

# Demo
You can try it here, with your own data.
You just have to grab one of the CSV file from the SDcard of your scale (named DATA1.CSV, DATA2.CSV, ...) and open it from the following page.

http://guzu.github.io/tanita-chart/

# TODO
- cleanup and refactor code
- body part mouseover
- zooming support
- ...
