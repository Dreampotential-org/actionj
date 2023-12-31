var segments = [
        {
        id: 99,
                type: 'image_text_choices_answers',
                img: 'img/wholehouse_13543large_2.jpeg',
                title: 'What accounts for the most energy use in American homes?',
                choices: ['Heating and cooling',
                        'Water heating',
                        'Electronics and lighting',
                        'Appliances'],
                answer: 'Heating and cooling',
                answer_text: 'According to the most recent Residential Energy Consumption Survey, heating and cooling accounted for 48 percent of total energy consumption in American homes. However, this number is down from 58 percent in 1993 as a result of improved technology and products such as more energy efficient heating and cooling systems, better insulation and energy efficient windows.'
                },
        {
        id: 7,
                title: 'Learn about the Clamagore in 3D',
                type: 'html',
                html: '<iframe frameborder="0" ' +
                'src="https://my.matterport.com/show/?m=GAPCjiGGCZ5?autoplay=1" ' +
                'sandbox="allow-same-origin allow-scripts allow-popups allow-forms" ' +
                '></iframe>',
                },
        {
        id: 1,
                type: 'title_text',
                title: 'The USS Clamagore: A Diesel Powered Submarine',
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
                type: 'html',
                html: "<img src='img/oil.jpg'></img>",
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
        {
        id: 2,
                type: 'title_text',
                title: 'Here is a title in bold on page',
                textarea_div: 'display this text on page in div'
                },
        /*
         {
         id: 3,
         type: 'question_choices',
         title: 'Here is a title in bold on page',
         choices: ['choice string 1 via radio button', 'two string'],
         textarea_div: 'display this text on page in div'
         },
         {
         id: 4,
         type: 'question_choices',
         title: 'Here is another set of questions',
         choices: ['choice 1', 'choice 2', 'choice 3'],
         textarea_div: 'display this text on page in div'
         } */
]

        var currentTab = 0

        function init() {

        var html = ''
                var que = ''

                segments.forEach((element, i) => {
                que += `<div class="tab" question_id=${element.id} id="tab${i}">
                      ${getOptions(i)}
                    </div>`
                        html += `<span class="step"></span>`
                })

                que += `<div style="overflow:auto;">
                <div style="float:right;">
                    <button type="button" id="prevBtn"
                        onclick="nextPrev(-1)">Previous</button>
                    <button type="button" id="nextBtn"
                        onclick="nextPrev(1)">Next</button>
                </div>
            </div>`

                que += `<div id="custom-indicator"
            style="text-align:center;margin-top:40px;">${html}</div>`

                $('#segForm').append(que)
                showTab(currentTab)
        }

function display_question(segment) {
var html = ''
        var que = ''
        // console.log(questions)
        que += `<div class="tab" segment_id=${segment.id} id="tab${currentTab}">
                    <h4>${segment.title}</h4>
                    ${getOptions(segment.choices, currentTab)}
                </div>`
        html += `<span class="step"></span>`

        que += `<div style="overflow:auto;">
                <div style="float:right;">
                    <button type="button" id="prevBtn"
                        onclick="nextPrev(-1)">Previous</button>
                    <button type="button" id="nextBtn"
                        onclick="nextPrev(1)" disabled>Next</button>
                </div>
            </div>`

        que += `<div id="custom-indicator"
            style="text-align:center;margin-top:40px;">${html}</div>`

        $('#segForm').append(que)
        showTab(currentTab)
}

var answers = []
        function getOptions(i) {

        var view = ''
                if (segments[i].type == 'html') {
        view = `<div class="form-group">
        <div><b>${segments[i].title}<b></div>
        ${segments[i].html}
    </div>`

        } else if (segments[i].type == 'speed_read') {
        view = `<div class="form-group">
                <textarea class="form-control" id="speed_read_input" rows="7" placeholder="">${
                segments[i].textarea_div
                }</textarea>
            </div>`
        } else if (segments[i].type == 'title_text') {
        view = `<div class="form-group">
                <input type="text" class="form-control" id="playtitle"  placeholder="Title" value="${
                segments[i].title
                }" readonly>
            </div>
            <div class="form-group">
                <textarea class="form-control" id="playspeed_read_input" rows="7" placeholder="" value="">${
                segments[i].textarea_div
                }</textarea>
            </div>`
        } else if (segments[i].type == 'image_text_choices_answers') {
        view = `<div class="form-group">
                <div class="question">${segments[i].title}</div>
                <div class="img"><img src="${segments[i].img}"></div>
            </div>`
                segments[i].choices.forEach(item => {
        view += `<div class="radio">
                        <label><input type="radio" value="${item}"
                                oninput="this.className = ''" name="que${i}">
                                    ${item}</label>
                    </div>`
        })
          
                view += `<div class="explaination" style="display:none">${segments[i].answer_text}</div><br>`
        } else {
        view = `<h4>${segments[i].title}</h4>`
                segments[i].choices.forEach(item => {
        view += `<div class="radio">
                        <label><input type="radio" value="${item}"
                                oninput="this.className = ''" name="que${i}">
                                    ${item}</label>
                    </div>`
        })
        }

        return view
        }

// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab

        var isDisable = true

                function showTab(n) {
                // This function will display the specified tab of the form...

                $('input[type=radio]').change(function () {
                isDisable = false
                        // $('#nextBtn').removeAttr('disabled')
                })

                        $('#prevBtn').click(function () {
                isDisable = false
                        // $('#nextBtn').removeAttr('disabled')
                })

                        // if (isDisable) $('#nextBtn').attr('disabled', true)

                        if (n >= segments.length) {
                // send results to backend
                return
                }
                var x = document.getElementsByClassName('tab')
                        x[n].style.display = 'block'
                        // ... and fix the Previous/Next buttons:
                        if (n == 0) {
                document.getElementById('prevBtn').style.display = 'none'
                } else {
                document.getElementById('prevBtn').style.display = 'inline'
                }
                if (n == x.length - 1) {
                // document.getElementById('nextBtn').innerHTML = 'Submit'
                document.getElementById('nextBtn').style.display = 'none'

                        swal({
                        title: "Done",
                                text: "Lesson Completed",
                                icon: 'success',
                        })


                } else {
                document.getElementById('nextBtn').style.display = 'inline'
                        document.getElementById('nextBtn').innerHTML = 'Next'
                }


                // ... and run a function that will display the correct step indicator:
                fixStepIndicator(n)
                }

        function nextPrev(n) {
        // populate  question_answers
        // question_answers[$('#tab' + currentTab).attr('question_id')] = $(
        //   '#tab' + currentTab + ' .radio input:checked'
        // ).val()

        // This function will figure out which tab to display
        var x = document.getElementsByClassName('tab')
                // Exit the function if any field in the current tab is invalid:
                // if (n == 1 && !validateForm()) return false
                // Hide the current tab:
                x[currentTab].style.display = 'none'
                // Increase or decrease the current tab by 1:
                currentTab = currentTab + n
                // if you have reached the end of the form...
                if (currentTab >= x.length) {
        // ... the form gets submitted:
        // return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab)
        }

        function fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i

                var x = document.getElementsByClassName('step')
                for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(' active', '')
        }
        // ... and adds the "active" class on the current step:
        x[n].className += ' active'
        }

        window.addEventListener('DOMContentLoaded', init, false)
        
