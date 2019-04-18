// ================================== JSON FILE OF DESIGNERS AT ROAM ====================================================================
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
// ================================== END OF JSON FILE OF DESIGNERS AT ROAM ====================================================================

// ================================== START INDIVIDUAL DESIGNER LOGIC ====================================================================

//Global variables
var behanceId;
var chosenPerson;

//Document loads the template7 context
$(document).ready(function(){
    loadTeam();
    boxChosen();
  });

//Toggles the pop-up to show/hide and clears previous injected data
function boxChosen() {
    $('.pop').toggle();
    $('.box').click(function() {
    $('.grid-1').empty();

//Pulls what selected json file is on and injects into Behance url
behanceId = $(this).attr('id');
var key = 'fkOE3sH1NEIOhZxVIonTECAglYkOASai';	
var urlProjects = 'https://api.behance.net/v2/users/' + behanceId + '/projects?client_id=' + key;

// AJAX request for Individual Designer's Projects
$.ajax({
    url: urlProjects,
    dataType: 'jsonp',
    // when the ajax request is complete do all of these things
    success: function(res) {
        var project = res.projects;
        res.projects.forEach(function(project) {
            $('<div class="mt-4 p-2"><a href="project.html?id=' + project.id + '"><div class="box2" style="background-image:url(\'' + project.covers.original + '\');"></div><p class="text-light mb-0 text-center">' + project.name + 
            '</p></div></a>').appendTo('.grid-1');
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

    //Variable for the image
    var chosenImg = (context.people[index].img);

    //Variable for the position
    var chosenPosition = (context.people[index].position);
    
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

    // compiles with Template7
    var compiledTemplate = Template7.compile(template);

    // Rendering the complied template with the data
   
    var json_data_html = compiledTemplate(context);
    document.getElementById("content_wrap").innerHTML = json_data_html;
};
// ================================== END INDIVIDUAL DESIGNER LOGIC ====================================================================

// ================================== START OF PROJECT PAGE LOGIC ====================================================================

	// If the ID #project has been rendered on the page, then run this code
	if($('#project').length > 0) {

        $('.back-to-people').click(function() {
            $('.pop').toggle()
          });
 
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
            var project = res.project;
            let modules = res.project.modules;
            let numberOfModules = modules.length;

            // show the project details 
                $('<h1 class="display-1 text-light text-center">' + project.name +'</h1>').appendTo('.project-name');
                    $('<p class="text-light text-center">' + project.description + '</p>').appendTo('.project-details');
                    // // Links for further documentation on Moment JS for time format
                    // https://momentjs.com/docs/#/displaying/fromnow/
                    // https://momentjs.com/docs/#/displaying/unix-timestamp/
                    $('<div><h3 class="text-light text-center">' + '<img class="icon-stats mr-2 mb-2" src="img/time.svg">' + moment.unix(project.published_on).fromNow() + '</h3>').appendTo('.project-stats');
                    $('<div><h3 class="text-light text-center">' + '<img class="icon-stats mr-2 mb-2" src="img/like.svg">' + project.stats.appreciations + '</h3></div>').appendTo('.project-stats');
                    $('<div><h3 class="text-light text-center">' + '<img class="icon-stats mr-2 mb-2" src="img/eye.svg">' + project.stats.views + '</h3></div>').appendTo('.project-stats');
                    $('<div><h3 class="text-light text-center">' + '<img class="icon-stats mr-2 mb-2" src="img/comment.svg">' + project.stats.comments + '</h3></div>').appendTo('.project-stats');
   
            // Displays the project images
                for (let i = 0; i < numberOfModules; i++) {
                    if (modules[i].type === 'image' && modules[i].sizes.max_1920 != undefined) {
                        $('<div><img class="project-image" src="' + modules[i].sizes.max_1920 + '"></div>').appendTo('.project-container');
                    } else if (modules[i].type === 'image' && modules[i].sizes.max_1240 != undefined) {
                        $('<div><img class="project-image" src="' + modules[i].sizes.max_1240 + '"></div>').appendTo('.project-container');
                    } else if (modules[i].type === 'image' && modules[i].sizes.original != undefined) {
                        $('<div><img class="project-image" src="' + modules[i].sizes.original + '"></div>').appendTo('.project-container');
                    } else if (modules[i].type === 'embed') {
                        $(modules[i].embed).appendTo('.project-container');
                    }
                    }
                }
            }); 
            };// ajax call for project display ends 

// ================================== END OF PROJECT PAGE LOGIC ====================================================================