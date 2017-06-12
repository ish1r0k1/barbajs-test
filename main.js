import Barba, { Pjax, Prefetch, Dispatcher, BaseView } from 'barba.js';

window.addEventListener('DOMContentLoaded', () => {
  // Initialize
  Pjax.start();
  Prefetch.init();

  // Base views
  const Homepage = BaseView.extend({
    namespace: 'homepage',
    onEnter: () => {
      console.log('Homepage: onEnter');
    },
    onEnterCompleted: () => {
      console.log('Homepage: onEnterCompleted');
    },
    onLeave: () => {
      console.log('Homepage: onLeave');
    },
    onLeaveCompleted: () => {
      console.log('Homepage: onLeave');
    }
  });

  Homepage.init();

  // Transitions
  Pjax.getTransiton = () => {
    return hideShowTransition;
  };

  const hideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(this.finish.bind(this));
    },
    finish: function() {
      document.body.scrollTop = 0;
      this.done();
    }
  });

  // Dispatcher
  Dispatcher.on('linkClied', (HTMLElement, MouseEvent) => {
    console.log('Event: linkClied', HTMLElement, MouseEvent);
  });

  Dispatcher.on('initStateChange', (currentStatus) => {
    console.log('Event: initStateChange', currentStatus);
  });

  Dispatcher.on('newPageReady', (currentStatus, oldStatus, container) => {
    console.log('Event: newPageReady', currentStatus, oldStatus, container);
  });

  Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
    console.log('Event: transitionCompleted', currentStatus, prevStatus);
  });
});
