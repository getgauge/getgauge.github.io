var controller = new ScrollMagic.Controller();

new ScrollMagic.Scene()
  .setPin('.section1')
  .addTo(controller);

new ScrollMagic.Scene({
    triggerElement: '.section2',
    triggerHook: 'onLeave'
  })
  .setPin('.section2')
  .addTo(controller);

new ScrollMagic.Scene({
    triggerElement: '.section3',
    triggerHook: 'onLeave'
  })
  .setPin('.section3')
  .addTo(controller);

