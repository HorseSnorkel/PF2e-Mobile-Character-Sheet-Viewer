Hooks.once('init', () => {
  game.settings.register('pf2e-mobile-viewer', 'visibleTabs', {
    name: 'Visible Tabs',
    hint: 'Choose which tabs to show on mobile.',
    scope: 'client',
    config: true,
    type: String,
    choices: {
      character: 'Character Sheet',
      chat: 'Chat',
      actors: 'Actors'
    },
    default: 'character,chat,actors'
  });

  game.settings.register('pf2e-mobile-viewer', 'darkTheme', {
    name: 'Enable Dark Theme',
    hint: 'Switch to a dark theme for mobile UI.',
    scope: 'client',
    config: true,
    type: Boolean,
    default: false
  });
});

Hooks.on('ready', () => {
  // Detect mobile device
  const isMobile = /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent);
  if (!isMobile) return;

  // Apply dark theme if enabled
  if (game.settings.get('pf2e-mobile-viewer', 'darkTheme')) {
    document.body.classList.add('pf2e-mobile-dark');
  }

  // Hide map and show only selected tabs
  document.getElementById('board').style.display = 'none';

  const visibleTabs = game.settings.get('pf2e-mobile-viewer', 'visibleTabs').split(',');

  // Show chat
  if (visibleTabs.includes('chat')) {
    document.getElementById('chat').style.display = '';
  } else {
    document.getElementById('chat').style.display = 'none';
  }

  // Show actors
  if (visibleTabs.includes('actors')) {
    document.getElementById('actors').style.display = '';
  } else {
    document.getElementById('actors').style.display = 'none';
  }

  // Auto-open character sheet
  if (visibleTabs.includes('character')) {
    const user = game.users.get(game.userId);
    const actor = user?.character;
    if (actor) actor.sheet.render(true, {focus: true});
  }
});