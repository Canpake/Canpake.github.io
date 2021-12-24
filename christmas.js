/** Opening Text **/
let text_timeline = anime.timeline({
  easing: 'easeOutCubic',
  duration: 1000
})

text_timeline.add({
  targets: '#christmas_text_path',
  easing: 'easeInQuart',
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 3000
}).add({
  targets: '.intro_text',
  opacity: [0, 1],
  translateY: [-50, 0],
  delay: anime.stagger(2500),
  complete: function() {
    text_timeline.pause();
    image_timeline.play();
  }
    // on button click, the text timeline resumes
}).add({
  targets: ['#christmas_text_path', '.intro_text'],
  opacity: [1, 0],
  translateY: [0, -20],
  z_index: -1,
  autoplay: false,
  complete: function() {  // disable button to play
    document.getElementsByClassName('intro_button')[0].disabled = true;
  }
})


/** Floating Images **/
let folder = "./images";
const image_count = 65;
const image_template = document.querySelector('#image_template')
const image_container = document.querySelector('#images');

// a list of image sizes in order from 1.jpg to 65.jpg; by python
const image_original_sizes = [{width: 3264, height: 2448}, {width: 750, height: 1334}, {width: 750, height: 1334}, {width: 3024, height: 4032}, {width: 2016, height: 1512}, {width: 2304, height: 4096}, {width: 2016, height: 1512}, {width: 2016, height: 1512}, {width: 1422, height: 909}, {width: 3024, height: 4032}, {width: 1920, height: 3412}, {width: 750, height: 600}, {width: 828, height: 1104}, {width: 960, height: 540}, {width: 2448, height: 3264}, {width: 720, height: 960}, {width: 3024, height: 4032}, {width: 2096, height: 3724}, {width: 4096, height: 2730}, {width: 2160, height: 3840}, {width: 3264, height: 2448}, {width: 3024, height: 4032}, {width: 828, height: 621}, {width: 4032, height: 3024}, {width: 3024, height: 4032}, {width: 540, height: 961}, {width: 3024, height: 4032}, {width: 3024, height: 4032}, {width: 2320, height: 3088}, {width: 1600, height: 898}, {width: 3024, height: 4032}, {width: 2576, height: 1920}, {width: 750, height: 1334}, {width: 4032, height: 3024}, {width: 2048, height: 1536}, {width: 732, height: 968}, {width: 4032, height: 3024}, {width: 3024, height: 4032}, {width: 3024, height: 4032}, {width: 3024, height: 4032}, {width: 1574, height: 2101}, {width: 750, height: 1334}, {width: 2320, height: 3088}, {width: 4096, height: 2730}, {width: 3024, height: 4032}, {width: 750, height: 1334}, {width: 3024, height: 4032}, {width: 4032, height: 3024}, {width: 2304, height: 4096}, {width: 602, height: 590}, {width: 3264, height: 2448}, {width: 3024, height: 4032}, {width: 3024, height: 4032}, {width: 712, height: 1370}, {width: 1334, height: 750}, {width: 3024, height: 4032}, {width: 1125, height: 1464}, {width: 2096, height: 3724}, {width: 750, height: 1334}, {width: 2320, height: 3088}, {width: 646, height: 527}, {width: 1015, height: 1920}, {width: 4032, height: 3024}, {width: 750, height: 1334}, {width: 3024, height: 4032}]
const image_final_sizes = image_original_sizes.map(function(element){
  element.height *= 450 / element.width;
  element.width = 450;
  return element;
})

let image_initial_size_min = 150;
let image_initial_size_max = 300;
let image_stagger_min = 5000;
let image_stagger_max = 20000;
let image_bg_original = 800;      // background width, in px; should be same as CSS
let image_bg_final = 450;         // eventual background width, in px
let image_bg_decrease = 20;       // in px
let image_size_increase = 3;      // % of way to eventual background width and height
let border_radius_decrease = 2;   // %
let border_radius_minimum = 5;    // %
let image_click_threshold = 16;   // number of clicks until animation plays, image becomes fully opaque

// Create images and associated animation information
let image_order = Array.from({length: image_count}, (_, i) => i + 1)
shuffleArray(image_order);
let image_info = []
let current_delay = 0;

for (let i = 0; i < image_count; i++) {
  let new_image = image_template.cloneNode(true);
  // styling + classes
  let size = image_initial_size_min + Math.floor(Math.random()*(image_initial_size_max-image_initial_size_min));
  let left = Math.floor(window.innerWidth * (0.2 + 0.6 * Math.random()) - size/2);
  new_image.style.width = size + 'px';
  new_image.style.height = size + 'px';
  new_image.style.left = left + 'px';
  new_image.style.top = `-${size}px`
  new_image.style.backgroundSize = `${image_bg_original}px`;

  new_image.style.visibility = 'visible';
  new_image.style.backgroundImage = `url(./images/${image_order[i]}.jpg)`;

  new_image.classList.add('floating_image');
  new_image.classList.add(`floating_image_${i}`);

  image_container.appendChild(new_image);

  image_info.push({
    width: size,
    height: size,
    final_width: image_final_sizes[image_order[i]-1].width,
    final_height: image_final_sizes[image_order[i]-1].height,
    left: left,
    delay: current_delay,
    bg_size: image_bg_original,
    border_radius: 50, // circle, 50% by default
    clicks: 0
  });
  current_delay += Math.floor(image_stagger_min + Math.random() * (image_stagger_max - image_stagger_min))
}

// Animation timeline
// Create stagger delays
let image_timeline = anime.timeline({
  easing: 'linear',
  duration: 30000,
  autoplay: false,
  loop: true,
}).add({
  targets: '.floating_image',
  translateY: '140vh',
  delay: (el, i) => {
    return image_info[i].delay;
  }
})

// Clicking animations for individual images
let images = image_container.childNodes;

// image_animations = []
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('mousedown', (event) => {
    // first calculate the amount for width/height to change
    let width_change = (0.01 * image_size_increase) * (image_info[i].final_width - image_info[i].width);
    let height_change = (0.01 * image_size_increase) * (image_info[i].final_height - image_info[i].height);

    image_info[i].width += width_change;
    image_info[i].height += height_change;
    image_info[i].left -= 0.5 * width_change;
    image_info[i].bg_size = Math.max(image_bg_final, image_info[i].bg_size - image_bg_decrease);
    image_info[i].border_radius = Math.max(border_radius_minimum, image_info[i].border_radius - border_radius_decrease);
    image_info[i].clicks += 1;

    anime({
      targets: `.floating_image_${i}`,
      easing: 'easeOutElastic(3, 0.5)',
      duration: 250,
      width: image_info[i].width,
      height: image_info[i].height,
      left: image_info[i].left,
      backgroundSize: image_info[i].bg_size,
      borderRadius: `${image_info[i].border_radius}%`
    });

    if (image_info[i].clicks === image_click_threshold) {
      // change opacity
      let image = document.getElementsByClassName(`floating_image_${i}`)[0];
      image.classList.add('floating_image_opaque');

      // particle animation
      performParticleAnimation(event.clientX, event.clientY);
    }
  });
}

// let x_shifts = []   // array of x transforms
// let y_shifts = []   // array of y transforms
//
// let particles = document.getElementsByClassName("particle");
// for (let i = 0; i < particles.length; i++) {
//   x_shifts.push(Math.floor(40 - Math.random() * 80));
//   y_shifts.push(Math.floor(40 - Math.random() * 80));
// }

// Particle effect on click
function performParticleAnimation(x, y) {
  let particles = document.getElementsByClassName("particle");
  let x_shifts = []   // array of x transforms
  let y_shifts = []   // array of y transforms
  for (let i = 0; i < particles.length; i++) {
    x_shifts.push(Math.floor(40 - Math.random() * 80));
    y_shifts.push(Math.floor(40 - Math.random() * 80));
    let initial_x = x + x_shifts[i];
    let initial_y = y + y_shifts[i];

    particles[i].style.left = `${initial_x}px`;
    particles[i].style.top = `${initial_y}px`;
    particles[i].style.visibility = 'visible';
  }

  anime({
    targets: '.particle',
    duration: 500,
    easing: 'easeOutCubic',
    translateX: (el, i) => {return x_shifts[i] * 1.5},
    translateY: (el, i) => {return y_shifts[i] * 1.5},
    opacity: [1, 0],
    complete: hideParticles,
  });
}

function hideParticles() {
  let particles = document.getElementsByClassName("particle");
  for (let i = 0; i < particles.length; i++) {
    particles[i].style.visibility = 'hidden';
    particles[i].style.transform = '';
  }
}



/** Background **/
// Options
const pathCount = 5;
const snowflakes = 100;
const fallDuration = 10000;
const staggerDelay = 200;

// Register snowflake paths
const snowPaths = [];
for (let i = 1; i <= pathCount; i++) {
  snowPaths.push(anime.path('#snowpath' + i))
}
// Create snowflakes in 2 groups
let snowflake = document.querySelector('#snowflake_template');
let snowflake_ctr = document.querySelector('#snowflakes');
for (let i = 0; i < snowflakes; i++) {
  let new_snowflake = snowflake.cloneNode(true);
  new_snowflake.style.left = (Math.random() * 100) + '%';
  new_snowflake.style.visibility = 'visible';

  new_snowflake.classList.add('snowflake_group' + (i % 2))

  let size = Math.floor(3 + Math.random()*5);
  new_snowflake.style.width = size + 'px';
  new_snowflake.style.height = size + 'px';
  new_snowflake.style.opacity = 0.3 + Math.random() * 0.4;
  snowflake_ctr.appendChild(new_snowflake);
}
// Animations - Group 1
let snowflake_anim1 = anime({
  targets: '.snowflake_group0',
  duration: fallDuration,
  translateX: function() {
    return snowPaths[anime.random(0, snowPaths.length-1)]('x');
  },
  translateY: ['0', '110vh'],
  easing: 'linear',
  loop: true,
  delay: anime.stagger(staggerDelay),
})
// Animations - Group 2
let snowflake_anim2;
setTimeout(function() {
  snowflake_anim2 = anime({
    targets: '.snowflake_group1',
    duration: fallDuration,
    translateX: function () {
      return snowPaths[anime.random(0, snowPaths.length - 1)]('x');
    },
    translateY: ['0', '110vh'],
    easing: 'linear',
    loop: true,
    delay: anime.stagger(staggerDelay),
  })
}, staggerDelay * snowflakes / 2)

// Controls
let anim_play = () => {
  snowflake_anim1.play();
  if (snowflake_anim2) snowflake_anim2.play();
  text_timeline.play()
  image_timeline.play();
}
let anim_pause = () => {
  snowflake_anim1.pause();
  if (snowflake_anim2) snowflake_anim2.pause();
  text_timeline.pause();
  image_timeline.pause();
}

// Misc Functions
// see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


// let text_anim = anime({
//   targets: '#center_text',
//   scale: [2, 4],
//   rotateY: { value: [0, 180],
//     duration: 500 },
//   duration: 200,
//   easing: 'linear',
//   autoplay: false
// });

// )({
//   targets: '#center_text',
//   scale: [4, 2],
//   rotateY: { value: [360, 0],
//              duration: 3000 },
//   duration: 1000,
//   easing: 'easeOutElastic(0.5, 0.8)',
//   autoplay: false
// });
//
// let text_anim_on = () => {
//   if (text_anim.reversed) { text_anim.reverse(); }
//   // text_anim.easing = 'easeOutElastic(0.5, 0.8)';
//   text_anim.play();
// }
//
// let text_anim_off = () => {
//   // text_anim.easing = 'easeInElastic(0.5, 0.8)';
//   if (!text_anim.reversed) { text_anim.reverse(); }
//   text_anim.play();
// }