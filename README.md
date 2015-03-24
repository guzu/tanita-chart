# Tanita Chart
This is a simple grapher (based on [d3.js](http://d3js.org/)) for raw CSV data from Tanita weighing scales and body composition monitors.
Only the **BC-601** model is supported.


#HowTo
The process is local for the moment
```bash
 $ cd tanita-chart
 $ ./filter.sh <path-to-your-sdcard>/DATA/DATA1.CSV > data/data.csv
```
Then simply open index.html in your browser


# TODO
- standalone HTML page 
  - support for HTML5 file API
  - get rid of the filter.sh script
- body part mouseover
- zooming support
- ...
