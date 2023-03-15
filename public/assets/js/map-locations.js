const cities = [
  { latitude: 39.7837304, longitude: -100.445882, name: "United States" },
  { latitude: 28.2502, longitude: -82.714081, name: "New Port" },
  { latitude: 42.506287, longitude: 1.521801, name: "Andorra" },
  { latitude: 49.488888, longitude: 8.469167, name: "Mannheim" },
  { latitude: 49.841952, longitude: 24.0315921, name: "Lviv" },
  { latitude: 40.3755885, longitude: 49.8328009, name: "Baku" },
  { latitude: 25.0742823, longitude: 55.1885387, name: "Dubai" },
  { latitude: 23.014509, longitude: 72.591759, name: "Ahamedabad" },
  { latitude: 15.317277, longitude: 75.71389, name: "Bangalore" },
  { latitude: 13.067439, longitude: 80.237617, name: "Chennai" },
  { latitude: 1.357107, longitude: 103.8194992, name: "Singapore" },
];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "none",
    panY: "none",
    wheelY: "none",
    projection: am5map.geoOrthographic(),
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  })
);

chart.geodata = am5geodata_worldLow;

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 1,
  strokeOpacity: 0,
});
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(360, 360, -360, -360),
});

backgroundSeries.set("fill", am5.color("#1e2140"));

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
  })
);

polygonSeries.mapPolygons.template.setAll({
  toggleKey: "active",
  interactive: false,
});

polygonSeries.set("fill", am5.color("#394076"));

var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
var circleTemplate = am5.Template.new({});

pointSeries.data.setAll(
  cities.map((cityItem) => {
    return {
      name: cityItem.name,
      geometry: {
        type: "Point",
        coordinates: [cityItem.longitude, cityItem.latitude],
      },
    };
  })
);

pointSeries.bullets.push(function (root, series, dataItem) {
  var container = am5.Container.new(root, {});

  var circle = container.children.push(
    am5.Circle.new(
      root,
      {
        radius: 4,
        fillOpacity: 1,
        fill: am5.color(0xffba00),
        cursorOverStyle: "pointer",
        tooltipText: `"{name}"`,
      },
      circleTemplate
    )
  );

  var countryLabel = container.children.push(
    am5.Label.new(root, {
      text: "{name}",
      paddingLeft: 5,
      paddingTop :5,
      populateText: true,
      fontWeight: "bold",
      fontSize: 13,
      centerX: am5.p50,
      fill: "#FFFFFF",
      textAlign: "center"
    })
  );

  circle.on("radius", function (radius) {
    countryLabel.set("x", radius);
  });

  return am5.Bullet.new(root, {
    sprite: container,
    dynamic: true,
  });
});

// Create line series
// var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

// lineSeries.pushDataItem({
//   pointsToConnect: cities.map((cityItem) => {
//     return pointSeries.pushDataItem(cityItem);
//   }),
// });

// lineSeries.mapLines.template.setAll({
//   stroke: am5.color(0xffba00),
//   strokeWidth: 2,
//   strokeOpacity: 1,
// });

// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  strokeOpacity: 0.1,
  stroke: root.interfaceColors.get("alternativeBackground"),
});

// Rotate animation
chart.animate({
  key: "rotationX",
  from: 40,
  to: -180,
  duration: 20000,
  loops: Infinity,
});

// Make stuff animate on load
chart.appear(1000, 100);
