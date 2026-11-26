export const demoResources = [
  { id: 1, name: 'Иван Иванов', description: 'Высококачественная видеосъёмка и аэросъёмка: доступные цены, профессиональное оборудование и опытные специалисты.', category: 'Фотограф', type: 'people', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=85' },
  { id: 2, name: 'Анастасия Ремогузина', description: 'Профессиональная фотосъёмка мероприятий, портретов и рабочих событий. Поможет сохранить важные моменты.', category: 'Фотограф', type: 'people', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=85' },
  { id: 3, name: 'Фотоаппарат Canon EOS', description: 'Зеркальная камера для профессиональной фото- и видеосъёмки. В комплекте объектив и аккумулятор.', category: 'Фототехника', type: 'equipment', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=85' },
  { id: 4, name: 'Комплект освещения', description: 'Студийный свет для съёмок, презентаций и записи видео. Доступен комплект из двух источников.', category: 'Оборудование', type: 'equipment', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&auto=format&fit=crop&q=85' },
  { id: 5, name: 'Переговорная «Сосна»', description: 'Уютная переговорная комната с большим экраном, доской и местом для команды до 10 человек.', category: 'Переговорная', type: 'spaces', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=85' },
  { id: 6, name: 'Конференц-зал', description: 'Просторный зал для встреч, лекций и презентаций. Вместимость — до 30 участников.', category: 'Конференц-зал', type: 'spaces', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format&fit=crop&q=85' },
  { id: 7, name: 'Михаил Петров', description: 'Специалист по организации мероприятий и техническому сопровождению встреч.', category: 'Координатор', type: 'people', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=85' },
  { id: 8, name: 'Проектор Epson', description: 'Проектор для презентаций и демонстрации материалов в переговорных комнатах.', category: 'Оборудование', type: 'equipment', image: 'https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?w=500&auto=format&fit=crop&q=85' },
]

export const initialInvitations = [
  { id: 101, title: 'Съёмки в Первомайском', time: '10:00 – 12:00', person: 'Иванов И. В.', category: 'Фотограф', date: new Date().toISOString().slice(0, 10), status: 'pending' },
  { id: 102, title: 'Подготовка презентации', time: '14:00 – 15:00', person: 'Анастасия Р.', category: 'Переговорная', date: new Date().toISOString().slice(0, 10), status: 'pending' },
]
