import('./petAbilities_modular.js').then(module => {
  const pets = module.petAbilities;
  const missingIcons = [];
  Object.entries(pets).forEach(([key, pet]) => {
    if (!pet.icon || pet.icon === 'MISSING' || pet.icon === '❓' || (typeof pet.icon === 'object' && pet.icon.fallback === '❓')) {
      missingIcons.push(key);
    }
  });
  console.log('Pets with missing/placeholder icons:', missingIcons.length);
  console.log('Missing icons:', missingIcons.slice(0, 15));
  if (missingIcons.length > 15) console.log('... and', missingIcons.length - 15, 'more');
});
