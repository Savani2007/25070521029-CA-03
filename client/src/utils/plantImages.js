export const getPlantImage = (species) => {
  const imageMap = {
    'Monstera Deliciosa': 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=800&h=600&fit=crop',
    'Snake Plant': 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=600&fit=crop',
    'Money Plant / Pothos': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop',
    'Golden Pothos': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop',
    'Peace Lily': 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=800&h=600&fit=crop',
    'Aloe Vera': 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&h=600&fit=crop',
    'Spider Plant': 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&h=600&fit=crop',
    'Tulsi': 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&h=600&fit=crop',
    'Rose': 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&h=600&fit=crop',
    'Hibiscus': 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=600&fit=crop',
    'Basil': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=800&h=600&fit=crop',
    'Succulent': 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&h=600&fit=crop',
    'Jade Plant': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop',
    'Rubber Plant': 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=800&h=600&fit=crop',
    'Areca Palm': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    'ZZ Plant': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop',
    'Fiddle-Leaf Fig': 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&h=600&fit=crop',
    'Other': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop'
  };
  return imageMap[species] || imageMap['Other'];
};
