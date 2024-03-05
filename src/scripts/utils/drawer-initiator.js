const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    const drawerElement = drawer;
    if (drawerElement.style.transform === 'translateX(0px)') {
      drawerElement.style.transform = 'translateX(-700px)';
    } else {
      drawerElement.style.transform = 'translateX(0px)';
    }
    event.stopPropagation();
  },

  _closeDrawer(event, drawer) {
    const drawerElement = drawer;
    drawerElement.style.transform = 'translateX(-700px)';
    event.stopPropagation();
  },
};

export default DrawerInitiator;
