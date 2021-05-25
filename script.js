// uses jQuery!

// define ghost objects
var demon = {
  id: "#demon",
  name: "Demon",
  evidence: ["Freezing Temps", "Ghost Writing", "Spirit Box"],
  matches: 0
}

var banshee = {
  id: "#banshee",
  name: "Banshee",
  evidence: ["EMF Level 5", "Fingerprints", "Freezing Temps"],
  matches: 0
}

var revenant = {
  id: "#revenant",
  name: "Revenant",
  evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"],
  matches: 0
}

var oni = {
  id: "#oni",
  name: "Oni",
  evidence: ["EMF Level 5", "Ghost Writing", "Spirit Box"],
  matches: 0
}

var mare = {
  id: "#mare",
  name: "Mare",
  evidence: ["Ghost Orb", "Freezing Temps", "Spirit Box"],
  matches: 0
}

var yurei = {
  id: "#yurei",
  name: "Yurei",
  evidence: ["Ghost Orb", "Freezing Temps", "Ghost Writing"],
  matches: 0
}

var wraith = {
  id: "#wraith",
  name: "Wraith",
  evidence: ["Fingerprints", "Freezing Temps", "Spirit Box"],
  matches: 0
}

var jinn = {
  id: "#jinn",
  name: "Jinn",
  evidence: ["EMF Level 5", "Ghost Orb", "Spirit Box"],
  matches: 0
}

var phantom = {
  id: "#phantom",
  name: "Phantom",
  evidence: ["EMF Level 5", "Ghost Orb", "Freezing Temps"],
  matches: 0
}

var polt = {
  id: "#polt",
  name: "Poltergeist",
  evidence: ["Ghost Orb", "Fingerprints", "Spirit Box", "Fingerprints"],
  matches: 0
}

var shade = {
  id: "#shade",
  name: "Shade",
  evidence: ["EMF Level 5", "Ghost Orb", "Ghost Writing"],
  matches: 0
}

var spirit = {
  id: "#spirit",
  name: "Spirit",
  evidence: ["Ghost Writing", "Fingerprints", "Spirit Box"],
  matches: 0
}

// create array of ghosts!
var ghosts = [banshee, demon, jinn, mare, oni, phantom, polt, revenant, shade, spirit, wraith, yurei];

// initialize other variables
var click_count = 0; // buttons selected
var selection = []; // evidence clicked
var pos; // var for deletion position
var results = 0; // no. of ghosts shown
var time = 150; // fade animation time

// DEFINE FUNCTIONS
// this function shows which ghosts are relevant to the selected evidence!
// runs every time you click an evidence button
function search() {   
  // first, hide ghost list and placeholder (with fade)
  $(".ghost").hide();
  $("#placeholder").hide();
  
  // remove crossed class for all evidence
  $(".evidence").removeClass("crossed");
   
  // reset results count
  results = 0;
  
  // PROCESS
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
            $(ghosts[i].id).fadeIn(time);
            
            // cross off that evidence in list (pass ghost obj in)
            cross_off(ghosts[i]);
            
            // add to result count
            results++;
          }
        }
      } 
    }
  }
    
  // once done iterating through ghosts
  // reset variables
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].matches = 0;
  } 
  // DEBUG
  // $("#matches").text(results);
  
  // show results
  $("#results span").text(results);
  
  // if no ghosts and no button clicked
  // show all ghosts
  if ((results < 1) && (click_count < 1)) {
    // force results
    $(".ghost").show();
    $("#results span").text(ghosts.length);
  } else if (results < 1) {
    // if no ghosts, but button clicked, show placeholder only
    $("#placeholder").fadeIn(time);
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

// MAIN FUNCTION
// run when window is done loading!
$( document ).ready(function() {
  
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
  }
  // set default results
  $("#results span").text(ghosts.length);
  
  // evidence search function!
  $( ".button" ).click(function( event ) {
    
    // TOGGLE BUTTON!
    // TURN OFF
    if ($(this).hasClass("clicked")) {
      click_count--; // remove button from count
      $(this).removeClass("clicked");
      
      // remove evidence from selection
      pos = selection.indexOf($(this).find("p").text());
      selection.splice(pos,1);
      
      // DEBUG
      // show contents of selection
      // $("#debug").text(selection);

      //show relevant (animated)
      $("#ghostlist").fadeOut(time, search);
      $("#ghostlist").promise().done($("#ghostlist").fadeIn(time));
      
    
      // TURN ON
    } else if (click_count < 3) {
    $(this).addClass("clicked");
      click_count++; // add
      
      // add evidence to selection
      selection.push($(this).find("p").text());
      
      // debug
      // $("#debug").text(selection);
      
      // show relevant ghosts! (animated)
      // adds promise to prevent animation conflict with more than one button (animations not finishing before new results processed)
      $("#ghostlist").fadeOut(time, search);
      $("#ghostlist").promise().done($("#ghostlist").fadeIn(time));
    }
   });
});