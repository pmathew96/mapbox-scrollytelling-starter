mapboxgl.accessToken = 'pk.eyJ1IjoiY2hldGFuYTExIiwiYSI6ImNqZHlpcjh0bDExZWwyeG82aDFjOHh1cjYifQ._jwIxDBiQfQxwK57JtUCSg';

var chapters = {
    'part-1': {
        center: [82.8, 23.88],
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
    },
    'part-2': {
        center: [96.420066, 28.365358],
        zoom: 10,
        bearing: 0,
        pitch: 0,
    },
    'part-3': {
        center: [86.586872, 26.873760],
        zoom: 9,
        bearing: 0,
        pitch: 52,
    },
    'part-4': {
        center: [95.659549, 24.003677],
        zoom: 9,
        bearing: 0,
        pitch: 0,
    }
};

var map;

window.onload = function() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/chetana11/cje8bue6si3062smokrifgmmt',
        center: [82.8, 23.88],
        zoom: 4,
        bearing: 0,
        pitch: 0,
    });
    map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['earthquakes'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.place + '</h3><p>' + feature.properties.mag + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
});

}

// On every scroll event, check which element is on screen
window.onscroll = function() {
    var chapterNames = Object.keys(chapters);
    console.log(chapterNames);
    for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};

var activeChapterName = 'part-1';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

