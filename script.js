// uses jQuery!

"use strict"; 

// INITIALIZE VARIABLES
var click_count = 0; // buttons selected
var selection = []; // evidence clicked
var pos; // var for deletion position
var results = 0; // no. of ghosts shown
var time = 150; // fade animation time

// define ghost objects (descriptions from the phasmophobia wiki)
var demon = {
  id: "#demon",
  name: "Demon",
  evidence: ["Freezing Temps", "Ghost Writing", "Spirit Box"],
    strength: "Demons are the most aggressive ghosts and will begin Hunts more often.",
    weakness: "Asking a Demon successful questions on the Ouija Board won't lower the user's sanity.",
  matches: 0
}

var banshee = {
  id: "#banshee",
  name: "Banshee",
  evidence: ["EMF Level 5", "Fingerprints", "Freezing Temps"],
    strength: "A Banshee will focus on one player at a time until it kills them or the player leaves the game.",
    weakness: "Banshees fear the Crucifix, which boosts the Hunt-stopping range of one from 3 meters to 5 meters against it.",
  matches: 0
}

var revenant = {
  id: "#revenant",
  name: "Revenant",
  evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"],
    strength: "A Revenant will travel at a significantly faster (2x) speed when hunting a victim. Additionally, the Revenant can freely switch whoever it is targeting during a Hunt.",
    weakness: "Hiding from the Revenant will cause it to move at a significantly reduced (0.5x) speed.",
  matches: 0
}

var oni = {
  id: "#oni",
  name: "Oni",
  evidence: ["EMF Level 5", "Ghost Writing", "Spirit Box"],
    strength: "Oni are more active when people are nearby and have been seen moving objects at great speed.",
    weakness: "Being more active will make the Oni easier to find and identify.",
  matches: 0
}

var mare = {
  id: "#mare",
  name: "Mare",
  evidence: ["Ghost Orb", "Freezing Temps", "Spirit Box"],
    strength: "Increased chance to attack in the dark. As such, it will do what it can to achieve this, such as turning off lights and tripping the fuse box.",
    weakness: "Turning the lights on will lower its chance to attack.",
  matches: 0
}

var yurei = {
  id: "#yurei",
  name: "Yurei",
  evidence: ["Ghost Orb", "Freezing Temps", "Ghost Writing"],
    strength: "Yurei have been known to have a stronger effect on people's Sanity during a manifestation.",
    weakness: "Using Smudge Sticks on the Yurei will cause it to not wander around the location for ~90 seconds.",
  matches: 0
}

var wraith = {
  id: "#wraith",
  name: "Wraith",
  evidence: ["Fingerprints", "Freezing Temps", "Spirit Box"],
    strength: "Wraiths almost never touch the ground, but this does not apply to the ghost model. Because of this, footprint sounds from a Wraith will be rare to non-existent, and stepping in Salt will be less likely.",
    weakness: "Wraiths have a toxic reaction to Salt. If a Wraith comes into contact with a pile of salt, Ghost Activity will increase.",
  matches: 0
}

var jinn = {
  id: "#jinn",
  name: "Jinn",
  evidence: ["EMF Level 5", "Ghost Orb", "Spirit Box"],
    strength: "A Jinn will travel at a faster speed if its victim is far away.",
    weakness: "Turning off the location's power source will prevent the Jinn from using its ability.",
  matches: 0
}

var phantom = {
  id: "#phantom",
  name: "Phantom",
  evidence: ["EMF Level 5", "Ghost Orb", "Freezing Temps"],
    strength: "Looking at a Phantom will considerably drop your Sanity. This refers to any visible manifestations of the Phantom, including during a Hunt.",
    weakness: "Taking a photo of the Phantom will make it temporarily disappear. This, however, will not stop a Hunt.",
  matches: 0
}

var polt = {
  id: "#polt",
  name: "Poltergeist",
  evidence: ["Ghost Orb", "Fingerprints", "Spirit Box", "Fingerprints"],
    strength: "A Poltergeist is capable of influencing more objects at once than any other Ghosts, and is capable of shutting multiple doors at once.",
    weakness: "A Poltergeist is almost ineffective in an empty room.",
  matches: 0
}

var shade = {
  id: "#shade",
  name: "Shade",
  evidence: ["EMF Level 5", "Ghost Orb", "Ghost Writing"],
    strength: "As a shy ghost, a Shade will rarely perform actions in the presence of two or more people, making it harder to detect.",
    weakness: "Conversely, a Shade will rarely start a Hunt when players are grouped together.",
  matches: 0
}

var spirit = {
  id: "#spirit",
  name: "Spirit",
  evidence: ["Ghost Writing", "Fingerprints", "Spirit Box"],
    strength: "The spirit has no discernible strengths, however it is known to increase its hunting as your sanity drops.",
    weakness: "Using Smudge Sticks on a Spirit will stop it attacking for 180 seconds instead of 90.",
  matches: 0
}

// new ghosts! add them to array later
var yokai = {
  id: "#yokai",
  name: "Yokai",
  evidence: ["Spirit Box", "Ghost Orb", "Ghost Writing"],
    strength: "",
    weakness: "",
  matches: 0
}

var hantu = {
  id: "#hantu",
  name: "Hantu",
  evidence: ["Ghost Orb", "Fingerprints", "Ghost Writing"],
    strength: "",
    weakness: "",
  matches: 0
}

// create array of ghosts!
var ghosts = [banshee, demon, jinn, mare, oni, phantom, polt, revenant, shade, spirit, wraith, yurei];


// DEFINE FUNCTIONS

// enable/disable evidence buttons based on whether a ghost can be matched w/ it
function enableButtons() {
    // for each evidence button
    $(".button").each(function() {
        // remove "available" class from button
        $(this).removeClass("available");
        var btn = $(this); // save reference to button (to add class)
        var btnText = $(this).find("p").text(); // save evidence text of button
        var match = 0;
        // for each ghost shown in results list, find evidence that matches
        // only go through ghosts that have display: flex! (shown ghosts)
        $(".ghost").each(function() {
            var display = $(this).css("display"); // get display state (works)
            if (display == "flex") {
                // iterate through evidence of shown ghost and find match!
                $(this).find(".evidence").each(function() {
                     if ($(this).text() == btnText) { // if match found
                         $(btn).addClass("available"); // make button available
                         // break evidence and ghost loops, go to next button
                         match++;
                         return; // break out of the evidence forEach loop
                     }
                });
            }   
            if (match) return; // break ghost forEach loop and go to next button
        });
        // animate button availability transitions
        if ($(this).hasClass("available")) {
            $(this).animate({ opacity: 1 }, time);
        } else {
            $(this).animate({ opacity: 0.5 }, time);
        }
    });
}

// show which ghosts are relevant to the selected evidence
// runs every time you click an evidence button
function search() {   
  // first, hide all ghosts, placeholder text, and descriptions
  $(".ghost").hide();
  $("#placeholder").hide();
    $(".description").hide();
    $("#attributions").hide();
  
  // remove crossed class for all evidence pieces
  $(".evidence").removeClass("crossed");
    
    // remove circled class for all ghost names
    $(".name").removeClass("circled");
   
  // reset results count
  results = 0;

    // cross off evidence for each ghost div if a piece matches selected evidence
  // for each ghost
  for (var i = 0; i < ghosts.length; i++) {
    // for each symptom in ghost
    for (var j = 0; j < 3; j++) {
      // iterate through evidence buttons
      for (var k = 0; k < selection.length; k++) {
        // does evidence match ghost's symptom?
        if (ghosts[i].evidence[j] == selection[k]) {
          // if yes, add a match to ghost
          ghosts[i].matches++;
          // do all ghost symptoms match evidence?
          if (selection.length == ghosts[i].matches) {
            // if yes, make that ghost a match
            $(ghosts[i].id).fadeIn(time); // ???? why fade in
            
            // cross off that evidence in list (pass ghost obj in)
            cross_off(ghosts[i]);
            
            // add to result count
            results++;
          }
        }
      } 
    }
  }
    
  // once done iterating through ghosts:
  
  // show number of ghost matches 
  $("#results span").text(results);
  
  // if no ghosts matched and no button clicked, show all ghosts
  if ((results < 1) && (click_count < 1)) {
    $(".ghost").show();
    $("#results span").text(ghosts.length);
  } else if (results < 1) {
    // if no ghosts, but at least one button clicked, show placeholder only
    $("#placeholder").fadeIn(time);
  } 
    
    // if only one ghost is shown in results, circle that specific ghost's name,
    // auto-expand its description, and scroll down to it
    if (results == 1) {
        for (var i = 0; i < ghosts.length; i++) {
            if (ghosts[i].matches >= 2) {
                // circle name
                $(ghosts[i].id).find(".name").addClass("circled");

                // expand info
                $(ghosts[i].id).find(".description").show();
            }
        } 
    }
    
    // gray out unused evidence buttons!
    enableButtons();
    
    // reset matched amounts
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].matches = 0;
  } 
}

// this function runs through and shows every ghost that qualifies
// also clears its matches var
function show_ghost() {
  for (var i = 0; i < ghosts.length; i++) {
    if (ghosts[i].show = true) {
      $(ghosts[i].id).fadeIn(time); // show ghost
    } // clear matches
    ghosts[i].matches = 0;
  } 
}

// this function crosses off evidence if a ghost found!
// passes in index of current ghost
function cross_off(ghost) {
  // iterate through current ghosts's evidence (again)
  for (var m = 0; m < 3; m++) {
    // iterate through selected evidence
    for (var n = 0; n < selection.length; n++) {
      // if they match
      if (ghost.evidence[m] == selection[n]) {
        // look for corresponding evidence in DOM
        $(ghost.id).find(".evidence").each(function(index) {
          if ($(this).text() == selection[n]) { // if found
            $(this).addClass("crossed"); // cross it off!
          }
        });
      }
    }
  }
}

// hide ghost list and perform search, then show again
function transitionAnim() {
    $("#ghostlist").fadeOut(time, search).fadeIn(function() {
        if ($("#results").find("span").text() == "1") {
            window.scroll(0, 9999); // scroll to bottom if only one ghost
        }
    }); 
}

// if scrolled down and btnScroll not already displayed, show it
function showScrollTop() {
    var style = getComputedStyle(document.getElementById("btnScroll"));
    if (window.scrollY >= 200) {
        if (style.display == "none") {
            $("#btnScroll").fadeIn(time);
        }
    } else if (style.display != "none") {
        $("#btnScroll").fadeOut(time);
    }
}

// expand description of selected ghost
function expandDesc(event) {
    // if description is not expanded, expand and scroll page to it
    // else if description is already open, simply close it
    var display = $(this).parent().children(".description").css("display");
    if (display == "none") {
        $(this).parent().children(".description").slideDown(function() {
            // scroll name to center of page (if possible)
            var offset = $(this).parent().offset();
            var center = window.innerHeight / 4; // quarter window height
            window.scroll(0, offset.top - center);
        })
    } else {
        $(this).parent().children(".description").slideUp();
    }
}

// MAIN FUNCTION
// runs when window is done loading!
$( document ).ready(function() {
    
    // make all buttons available at start (unavailable ones are not clickable)
    $(".button").each(function() {
        $(this).addClass("available");
    });
    
    // SET EVENT LISTENERS
    // scroll to top button function
    $("#btnScroll").click(function() { window.scrollTo(0,0); });
    
    // show Scroll To Top button on scrolldown
    window.addEventListener("scroll", showScrollTop);
    
    $("#attLink").click(function() {
        $("#attributions").slideToggle(function() {
            window.scroll(0, 9999); // force it to go all the way to the bottom lol
        });
    })
    
  // auto-fill out fields
  for (var i = 0; i < ghosts.length; i++) {
      
      // fill ghost names
      $("#display")    
        .find(ghosts[i].id)
        .find(".name")
        .text(ghosts[i].name);

      // fill evidence lists
      $("#display")
        .find(ghosts[i].id)
        .find(".evidence1")
        .text(ghosts[i].evidence[0]);
      $("#display")
        .find(ghosts[i].id)
        .find(".evidence2")
        .text(ghosts[i].evidence[1]);
      $("#display")
        .find(ghosts[i].id)
        .find(".evidence3")
        .text(ghosts[i].evidence[2]);

        // fill ghost descriptions
        $("#display")    
        .find(ghosts[i].id)
        .find(".description .strength")
        .text(ghosts[i].strength);
      
      // fill ghost descriptions
        $("#display")    
        .find(ghosts[i].id)
        .find(".description .weakness")
        .text(ghosts[i].weakness);
  }

  // set default results
  $("#results span").text(ghosts.length);
    
    // set listener for hide/show description (anonymous)
    $( ".name" ).click(expandDesc);
  
  // set button click listener for evidence search function! (anonymous)
    $( ".button" ).click(function( event ) {
        if ($(this).hasClass("available")) { // button must be enabled
            // TOGGLE BUTTON!
            // TURN OFF (if button is on)
            if ($(this).hasClass("clicked")) {
              click_count--; // remove button from count
              $(this).removeClass("clicked");

                // hide cross-off image of button (un-cross image)
                $(this).find("img").animate({
                    opacity: 0
                }, time);
                // $(this).find("img").fadeOut(time);

              // remove evidence from selection
              pos = selection.indexOf($(this).find("p").text());
              selection.splice(pos,1);

              //show relevant (animated)
                transitionAnim();

              // TURN ON (if less than 3 buttons already clicked)
            } else if (click_count < 3) {
            $(this).addClass("clicked");
              click_count++; // add

                // show cross-off image of button
                $(this).find("img").animate({
                    opacity: 1
                }, time);
                //$(this).find("img").fadeIn(time);

              // add evidence to selection
              selection.push($(this).find("p").text());

                // show relevant (animated)
                transitionAnim();
            }
        }
   });
});