var segments = [
{   id: 1,
    type: 'title_img',
    title: 'Explore USS Clamagore - A Diesel Powered Submarine',
    img: 'img/sub.jpg',
},
  {
    id: 7,
    title: 'Explore in 3D',
    type: 'html',
    html: '<iframe frameborder="0" ' +
            'src="https://my.matterport.com/show/?m=GAPCjiGGCZ5?autoplay=1" ' +
            'sandbox="allow-same-origin allow-scripts allow-popups allow-forms" ' +
            '></iframe>',
  },
  {
    id: 1,
    type: 'title_text',
    title: 'Diesel',
    textarea_div: `
The USS Clamagore used diesel fuel oil to make her go! This isn't anything you would find in the kitchen- no- not that kind of oil.

Let's break down what diesel fuel oil is:

It is a liquid and has the basic properties of liquid matter, including taking the shape of its container.
It is a homogeneous mixture, meaning it is made up of the same amounts of different liquids.
These liquids come from crude oil. Crude oil is also referred to as a fossil fuel because over long periods of geologic time it formed from decayed plants and animals.
`
  },
  {
    id: 7,
    title: 'How does Diesel Fuel Process',
    type: 'title_img',
    img: 'img/oil.jpg',
  },
  {
    id: 7,
    title: 'Matter Video',
    type: 'html',
    html: "<video src='video.mp4' controls></video>",

  },
  {
    id: 4,
    type: 'question_choices',
    title: 'What type of Matter is Diesel?',
    choices: ['Soild', 'Liquid', 'Gas'],
    textarea_div: 'display this text on page in div'
  },
]

function init() {
    if (typeof(load_questions) === "function") {
        load_questions();
    }
}

window.addEventListener('DOMContentLoaded', init, false)
