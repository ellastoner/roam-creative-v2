var context = {
    people : [
        { 
            name: 'Lucas Coelho',
            position: 'Group Head of Design',
            img: 'img/01.jpg',
            bio: 'Hey I am Lucas',
            id: 'drfranken'
        },
        { 
            name: 'Crystal Lin',
            position: 'product Designer',
            img: 'img/02.jpg',
            bio: 'Hey I am Crystal',
            id: 'together-we-create'  
        },
        { 
            name: 'Xavier Martin',
            position: 'Architect',
            img: 'img/03.jpg',
            bio: 'Hey I am Xavier',
            id: 'ArinaShabanova' 
        },
        { 
            name: 'Thea Betts',
            position: 'UX Designer',
            img: 'img/04.jpg',
            bio: 'Hey I am Thea',
            id: 'FrancescoBongiorni'
        },
        { 
            name: 'Marina Baker',
            position: 'Designer',
            img: 'img/05.jpg',
            bio: 'Hey I am Marina',
            id: 'antoniouve'  
        },
        { 
            name: 'Charles Cheng',
            position: 'Digital Product Designer',
            img: 'img/06.jpg',
            bio: 'Hey I am Charles',
            id: 'j-gallardo'  
        },
        { 
            name: 'Vajira Withanage',
            position: 'Senior Developer',
            img: 'img/07.jpg',
            bio: 'Hey I am Vajira',
            id: 'gonzzzalo'   
        },
        {
            name: 'Carla Monteiro',
            position: 'Digital Designer',
            img: 'img/08.jpg',
            bio: 'Hey I am Carla',
            id: 'adrianabermudez'   
        },
        {
            name: 'Carla Monteiro',
            position: 'Digital Designer',
            img: 'img/08.jpg',
            bio: 'Hey I am Carla',
            id: 'MARCIALPROJECTS'   
        },
        {
            name: 'Carla Monteiro',
            position: 'Digital Designer',
            img: 'img/08.jpg',
            bio: 'Hey I am Carla',
            id: 'noelialozano'   
        },
        {
            name: 'Carla Monteiro',
            position: 'Digital Designer',
            img: 'img/08.jpg',
            bio: 'Hey I am Carla',
            id: 'relajaelcoco'   
        },
        {
            name: 'Carla Monteiro',
            position: 'Digital Designer',
            img: 'img/08.jpg',
            bio: 'Hey I am Carla',
            id: 'relajaelcoco'   
        }
        
    ]
};

var behanceId;
var chosenPerson;


$(document).ready(function(){
    $('.slick-me').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '60px',
        arrows: true,
        speed: 300
    });
  });


$(document).ready(function(){
    loadTeam();
    boxChosen();

  });


function boxChosen() {

    $('.pop').toggle();

    $('.box').click(function() {

        $('.grid-1').empty();

       

//Pulls what selected json file is on 
behanceId = $(this).attr('id');
console.log('This is the id: ' + behanceId);
var key = 'fkOE3sH1NEIOhZxVIonTECAglYkOASai';	
var urlProjects = 'https://api.behance.net/v2/users/' + behanceId + '/projects?client_id=' + key;
// var urlUserProjects = 'https://api.behance.net/v2/users/' + behanceUser + '/';
// var urlSelectedProject = 'http://www.behance.net/v2/projects/' + projectId + '?' + key;


// AJAX request for PROJECT INFO
$.ajax({
    url: urlProjects,
    dataType: 'jsonp',
    // when the ajax request is complete do all of these things
    success: function(res) {
        
        var project = res.projects;

        console.log(res);
        console.log(res.projects);
        console.log(behanceId);
        console.log('this is what I have pulled from the API' + urlProjects);


        res.projects.forEach(function(project) {

            $('<div class="mt-4 p-2"><a href="project.html?id=' + project.id + '"><div class="box2" style="background-image:url(\'' + project.covers.original + '\');"></div><p class="text-light mb-0 text-center">' + project.name + 
            '</p></div></a>').appendTo('.grid-1');




            // $('<div class="mt-4"><a href="project.html?id=' + project.id + '"><div class="box" id="" style="background-image:url("'+ project.covers.original +'");></div><p class="text-light mb-0 text-center">' + project.name + 
            // '</p></div></a>').appendTo('.grid-1');
        });
    
    }
});


    //emptys the innerhtml
    $('.designer-name').empty();
    $('.designer-position').empty();

    //Trigger the pop-up to show 
    $('.pop').toggle();

     //Variables to pull selected json object
    var index = $(this).attr('data-nr');

    //Variable for the name
    var firstName = (context.people[index].name);
    console.log('this is the designers name' + firstName);

    //Variable for the image
    var chosenImg = (context.people[index].img);
    console.log('this is the img' + chosenImg);

    //Variable for the position
    var chosenPosition = (context.people[index].position);
    console.log ('this is the position ' + chosenPosition);

    //appends the data into the DOM 
    $('.designer-name').append(firstName);
    $('.designer-position').append(chosenPosition);
    $('.pop-up').css('background-image', 'url(' + chosenImg + ')');

});

    //Takes user back to designers
  $('.back').click(function() {
    $('.pop').toggle()
  });


};

function loadTeam() {

    var template = document.getElementById('html_template').innerHTML;

    // compile it with Template7
    var compiledTemplate = Template7.compile(template);

    // Now we may render our compiled template by passing required context
   
    var json_data_html = compiledTemplate(context);
    document.getElementById("content_wrap").innerHTML = json_data_html;
};


// function loadProject(res) {

//     var template1 = document.getElementById('htmltemp').innerHTML;


//     // compile it with Template7
//     var compiledTemplate1 = Template7.compile(template1);

//     // Now we may render our compiled template by passing required context
   
//     var json_data_html1 = compiledTemplate1(res);
//     $('#pop-wrap').html(json_data_html1);

// };


// ================================== PROJECT PAGE TEMPLATE ====================================================================

	// If the ID #project has been rendered on the page, then run this code
	if($('#project').length > 0) {
 
		var pageURL = new URL(document.location);
        var params = pageURL.searchParams;
        var key = 'SCJnOBwjJqgpwxIybOHvs0cUt0XRrydH';	// Your unique key - https://www.behance.net/dev
		var id = params.get('id');
		var urlProject = 'http://www.behance.net/v2/projects/' + id + '?api_key=' + key;

		// AJAX request
		$.ajax({

			url: urlProject,
			dataType: 'jsonp',

			// when the ajax request is complete do all of these things
			success: function(res) {

				console.log(res);

				var project = res.project;

				// show the project details like this
				$('<h1>' + project.name +'</h1>').appendTo('.container');
				$('<p>' + project.description + '</p>').appendTo('.container');
				// // using Moment JS for clean and easy to use time format
				// https://momentjs.com/docs/#/displaying/fromnow/
				// https://momentjs.com/docs/#/displaying/unix-timestamp/
				$('<h3>' + '<small>published:</small>' + moment.unix(project.published_on).fromNow() + '</h3>').appendTo('.container');
				$('<img src="' + project.covers.original + '">').appendTo('.container');
			}
		});

	}
	
