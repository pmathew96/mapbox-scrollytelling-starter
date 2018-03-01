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
        center: [70.653880, 36.193232],
        zoom: 9,
        bearing: 0,
        pitch: 0,
    }
};

var map;

window.onload = function() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/chetana11/cjdyiw4702xl02sqkqmc6gyyi',
        center: [82.8, 23.88],
        zoom: 4,
        bearing: 0,
        pitch: 0,
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