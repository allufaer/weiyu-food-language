/* =====================================================================
   味语 WeiYu — 内容数据层
   所有多语种字段结构统一为 { zh, en, ja }，便于 UI 按目标语言切换。
   ===================================================================== */

window.DATA = {
  /* ----------------------------- 菜谱 ----------------------------- */
  recipes: [
    {
      id: 'r-tomato-egg', emoji: '🍅', color: '#FFE0CC', accent: '#E8734A',
      name: { zh: '番茄炒蛋', en: 'Tomato & Egg Stir-fry', ja: 'トマトと卵の炒め物' },
      cuisine: '中餐', tags: ['家常', '快手', '素食'], difficulty: 1, time: 15, servings: 2,
      unlockXp: 0, xpReward: 20,
      intro: {
        zh: '国民下饭菜，酸甜绵软，是学厨与学语言的最佳起点。',
        en: 'A beloved Chinese comfort dish — sweet, tangy and the perfect starting point.',
        ja: '中国の定番おかず。甘酸っぱくて、料理と語学の最初の一歩にぴったり。'
      },
      ingredients: [
        { zh: '番茄', en: 'tomato', ja: 'トマト', amount: '2 个 / 2 / 2個' },
        { zh: '鸡蛋', en: 'egg', ja: '卵', amount: '3 个 / 3 / 3個' },
        { zh: '葱', en: 'scallion', ja: 'ねぎ', amount: '1 根 / 1 / 1本' },
        { zh: '盐', en: 'salt', ja: '塩', amount: '少许 / a pinch / 少々' },
        { zh: '糖', en: 'sugar', ja: '砂糖', amount: '1 勺 / 1 tbsp / 大さじ1' }
      ],
      steps: [
        { zh: '番茄切块，鸡蛋打散加少许盐。', en: 'Chop the tomatoes; beat the eggs with a pinch of salt.', ja: 'トマトを切り、卵に塩少々を加えて溶きほぐす。' },
        { zh: '热油炒熟鸡蛋，盛出备用。', en: 'Scramble the eggs in hot oil, then set aside.', ja: '熱した油で卵を炒め、いったん取り出す。' },
        { zh: '下番茄炒出汁，加糖调味。', en: 'Stir-fry tomatoes until juicy, then add sugar.', ja: 'トマトを炒めて汁を出し、砂糖で味を整える。' },
        { zh: '倒回鸡蛋翻炒均匀，撒葱花出锅。', en: 'Return the eggs, toss well, garnish with scallions.', ja: '卵を戻してよく炒め、ねぎを散らして完成。' }
      ],
      vocab: ['tomato', 'egg', 'salt', 'sugar', 'stir-fry', 'scallion']
    },
    {
      id: 'r-miso-soup', emoji: '🍲', color: '#FBE8C9', accent: '#D99A3B',
      name: { zh: '日式味噌汤', en: 'Miso Soup', ja: '味噌汁' },
      cuisine: '日料', tags: ['汤品', '快手', '素食'], difficulty: 1, time: 15, servings: 2,
      unlockXp: 0, xpReward: 20,
      intro: {
        zh: '一碗温暖的味噌汤，读懂日式家常的温柔。',
        en: 'A warm bowl of miso soup — the gentle soul of Japanese home cooking.',
        ja: 'あたたかい味噌汁。日本の家庭のやさしさを感じる一杯。'
      },
      ingredients: [
        { zh: '味噌', en: 'miso', ja: '味噌', amount: '2 勺 / 2 tbsp / 大さじ2' },
        { zh: '豆腐', en: 'tofu', ja: '豆腐', amount: '半块 / ½ block / 1/2丁' },
        { zh: '裙带菜', en: 'wakame', ja: 'わかめ', amount: '少许 / a handful / 少々' },
        { zh: '葱花', en: 'scallion', ja: 'ねぎ', amount: '适量 / to taste / 適量' },
        { zh: '高汤', en: 'dashi stock', ja: 'だし', amount: '600ml / 600ml / 600ml' }
      ],
      steps: [
        { zh: '高汤煮开，放入切好的豆腐。', en: 'Bring dashi to a simmer and add the cubed tofu.', ja: 'だしを煮立て、角切りの豆腐を加える。' },
        { zh: '关火，舀少许汤化开味噌再倒回。', en: 'Off heat, dissolve miso in a ladle of broth, then stir in.', ja: '火を止め、お玉で味噌を溶いて加える。' },
        { zh: '加入泡软的裙带菜，撒葱花即可。', en: 'Add rehydrated wakame and garnish with scallions.', ja: '戻したわかめを加え、ねぎを散らす。' }
      ],
      vocab: ['tofu', 'scallion', 'simmer', 'miso']
    },
    {
      id: 'r-oyakodon', emoji: '🍚', color: '#FFE3D6', accent: '#E07A3B',
      name: { zh: '亲子丼', en: 'Oyakodon', ja: '親子丼' },
      cuisine: '日料', tags: ['盖饭', '主菜'], difficulty: 2, time: 25, servings: 1,
      unlockXp: 0, xpReward: 25,
      intro: {
        zh: '"亲子"指鸡肉与鸡蛋，一碗裹满鲜甜酱汁的盖饭。',
        en: '"Parent and child" — chicken and egg simmered in sweet-savory sauce over rice.',
        ja: '親子丼は鶏肉と卵の甘辛い丼ご飯。'
      },
      ingredients: [
        { zh: '鸡腿肉', en: 'chicken', ja: '鶏肉', amount: '100g / 100g / 100g' },
        { zh: '鸡蛋', en: 'egg', ja: '卵', amount: '2 个 / 2 / 2個' },
        { zh: '洋葱', en: 'onion', ja: '玉ねぎ', amount: '半个 / ½ / 1/2個' },
        { zh: '酱油', en: 'soy sauce', ja: '醤油', amount: '2 勺 / 2 tbsp / 大さじ2' },
        { zh: '米饭', en: 'rice', ja: 'ご飯', amount: '1 碗 / 1 bowl / 1杯' }
      ],
      steps: [
        { zh: '洋葱切丝，鸡肉切小块。', en: 'Slice the onion and cut chicken into bite pieces.', ja: '玉ねぎを薄切り、鶏肉を一口大に切る。' },
        { zh: '酱油、味醂、糖煮汁，下洋葱与鸡肉煮透。', en: 'Simmer onion and chicken in a soy-mirin-sugar broth.', ja: '醤油・みりん・砂糖の煮汁で玉ねぎと鶏肉を煮る。' },
        { zh: '淋入打散的蛋液，盖盖焖至半熟。', en: 'Pour in beaten egg, cover and cook until set.', ja: '溶き卵を流し入れ、蓋をして半熟にする。' },
        { zh: '盛在米饭上，撒葱花。', en: 'Spoon over rice and garnish with scallions.', ja: 'ご飯にかけ、ねぎを散らす。' }
      ],
      vocab: ['chicken', 'egg', 'onion', 'rice', 'soy sauce', 'simmer']
    },
    {
      id: 'r-bolognese', emoji: '🍝', color: '#FCD9CC', accent: '#C0492B',
      name: { zh: '意式肉酱面', en: 'Spaghetti Bolognese', ja: 'スパゲッティ・ボロネーゼ' },
      cuisine: '西餐', tags: ['意面', '主菜'], difficulty: 2, time: 40, servings: 2,
      unlockXp: 0, xpReward: 25,
      intro: {
        zh: '慢炖的番茄肉酱，裹住每一根意面。',
        en: 'Slow-simmered tomato meat sauce clinging to every strand of pasta.',
        ja: 'トマトと肉のソースをじっくり煮込んだパスタ。'
      },
      ingredients: [
        { zh: '意面', en: 'spaghetti', ja: 'スパゲッティ', amount: '200g / 200g / 200g' },
        { zh: '牛肉末', en: 'beef', ja: '牛肉', amount: '200g / 200g / 200g' },
        { zh: '番茄罐头', en: 'tomato', ja: 'トマト', amount: '1 罐 / 1 can / 1缶' },
        { zh: '洋葱', en: 'onion', ja: '玉ねぎ', amount: '1 个 / 1 / 1個' },
        { zh: '大蒜', en: 'garlic', ja: 'ニンニク', amount: '2 瓣 / 2 / 2片' }
      ],
      steps: [
        { zh: '洋葱与大蒜切碎，热油炒香。', en: 'Chop onion and garlic, sauté until fragrant.', ja: '玉ねぎとニンニクをみじん切りにし、炒める。' },
        { zh: '加入牛肉末炒散至变色。', en: 'Add ground beef and brown it.', ja: '牛ひき肉を加え、色が変わるまで炒める。' },
        { zh: '倒入番茄罐头，小火慢炖 20 分钟。', en: 'Add canned tomatoes and simmer 20 minutes.', ja: 'トマト缶を加え、弱火で20分煮込む。' },
        { zh: '煮好意面，拌入肉酱，撒帕玛森芝士。', en: 'Toss cooked pasta with sauce and top with parmesan.', ja: '茹でたパスタと和え、パルメザンをかける。' }
      ],
      vocab: ['beef', 'tomato', 'onion', 'garlic', 'simmer', 'cheese']
    },
    {
      id: 'r-teriyaki-chicken', emoji: '🍗', color: '#FFE1BD', accent: '#B96B1F',
      name: { zh: '照烧鸡腿', en: 'Teriyaki Chicken', ja: '照り焼きチキン' },
      cuisine: '日料', tags: ['主菜', '便当'], difficulty: 2, time: 30, servings: 2,
      unlockXp: 0, xpReward: 25,
      intro: {
        zh: '焦糖般发亮的照烧酱汁，甜咸交织。',
        en: 'A glossy, caramelized teriyaki glaze — sweet and savory.',
        ja: '照りの良い甘辛いタレが絶品の鶏肉料理。'
      },
      ingredients: [
        { zh: '去骨鸡腿', en: 'chicken', ja: '鶏肉', amount: '2 块 / 2 / 2枚' },
        { zh: '酱油', en: 'soy sauce', ja: '醤油', amount: '3 勺 / 3 tbsp / 大さじ3' },
        { zh: '味醂', en: 'mirin', ja: 'みりん', amount: '3 勺 / 3 tbsp / 大さじ3' },
        { zh: '糖', en: 'sugar', ja: '砂糖', amount: '1 勺 / 1 tbsp / 大さじ1' },
        { zh: '姜', en: 'ginger', ja: '生姜', amount: '少许 / a little / 少々' }
      ],
      steps: [
        { zh: '鸡腿肉用叉子戳孔，腌制 10 分钟。', en: 'Poke the chicken and marinate 10 minutes.', ja: '鶏肉に穴をあけ、10分漬ける。' },
        { zh: '皮朝下煎至金黄，翻面。', en: 'Pan-fry skin-side down until golden, then flip.', ja: '皮を下にして焼き色がつくまで焼き、裏返す。' },
        { zh: '倒入酱汁，小火收汁至浓稠裹住。', en: 'Add sauce and reduce until glossy.', ja: 'タレを加え、弱火で照りが出るまで煮詰める。' },
        { zh: '切块装盘，淋上剩余酱汁。', en: 'Slice, plate, and drizzle with remaining sauce.', ja: '食べやすく切り、タレをかける。' }
      ],
      vocab: ['chicken', 'soy sauce', 'sugar', 'ginger', 'bake']
    },
    {
      id: 'r-caesar-salad', emoji: '🥗', color: '#DFF3D8', accent: '#4E9B3A',
      name: { zh: '凯撒沙拉', en: 'Caesar Salad', ja: 'シーザーサラダ' },
      cuisine: '西餐', tags: ['沙拉', '轻食', '素食'], difficulty: 1, time: 15, servings: 2,
      unlockXp: 0, xpReward: 20,
      intro: {
        zh: '脆爽生菜、面包丁与帕玛森，清爽无负担。',
        en: 'Crisp romaine, croutons and parmesan — fresh and light.',
        ja: 'クリスピーなレタスとクルトン、パルメザンのさっぱりサラダ。'
      },
      ingredients: [
        { zh: '罗马生菜', en: 'romaine lettuce', ja: 'ロメインレタス', amount: '1 棵 / 1 / 1株' },
        { zh: '面包丁', en: 'crouton', ja: 'クルトン', amount: '适量 / to taste / 適量' },
        { zh: '帕玛森芝士', en: 'cheese', ja: 'チーズ', amount: '适量 / to taste / 適量' },
        { zh: '凯撒酱', en: 'caesar dressing', ja: 'シーザードレッシング', amount: '3 勺 / 3 tbsp / 大さじ3' },
        { zh: '柠檬', en: 'lemon', ja: 'レモン', amount: '半个 / ½ / 1/2個' }
      ],
      steps: [
        { zh: '生菜洗净撕成适口大小，沥干。', en: 'Wash and tear lettuce, dry well.', ja: 'レタスを洗ってちぎり、水気を切る。' },
        { zh: '加入面包丁，淋上凯撒酱拌匀。', en: 'Add croutons and toss with dressing.', ja: 'クルトンを加え、ドレッシングで和える。' },
        { zh: '刨上芝士丝，挤少许柠檬汁。', en: 'Shave parmesan and squeeze a little lemon.', ja: 'チーズを削り、レモンを絞る。' }
      ],
      vocab: ['vegetable', 'cheese', 'mix', 'lemon']
    },
    {
      id: 'r-japanese-curry', emoji: '🍛', color: '#F7E0B0', accent: '#A06A12',
      name: { zh: '日式咖喱饭', en: 'Japanese Curry Rice', ja: 'カレーライス' },
      cuisine: '日料', tags: ['主菜', '下饭'], difficulty: 2, time: 45, servings: 3,
      unlockXp: 100, xpReward: 35,
      intro: {
        zh: '浓郁香甜的日式咖喱，配米饭是国民级美味。',
        en: 'Rich, sweet Japanese curry — a national favorite over rice.',
        ja: '甘口でまろやかな日本のカレー。ご飯のお供に最高。'
      },
      ingredients: [
        { zh: '咖喱块', en: 'curry roux', ja: 'カレールー', amount: '半盒 / ½ box / 1/2箱' },
        { zh: '牛肉', en: 'beef', ja: '牛肉', amount: '250g / 250g / 250g' },
        { zh: '土豆', en: 'potato', ja: 'じゃがいも', amount: '2 个 / 2 / 2個' },
        { zh: '胡萝卜', en: 'carrot', ja: 'にんじん', amount: '1 根 / 1 / 1本' },
        { zh: '洋葱', en: 'onion', ja: '玉ねぎ', amount: '1 个 / 1 / 1個' }
      ],
      steps: [
        { zh: '蔬菜与牛肉切块，洋葱炒香。', en: 'Cube veggies and beef; sauté the onion.', ja: '野菜と牛肉を切り、玉ねぎを炒める。' },
        { zh: '加入牛肉翻炒至变色。', en: 'Add beef and stir-fry until browned.', ja: '牛肉を加え、炒める。' },
        { zh: '加水没过食材，小火煮 20 分钟。', en: 'Add water to cover and simmer 20 minutes.', ja: 'かぶるくらいの水を加え、弱火で20分煮る。' },
        { zh: '关火加入咖喱块化开，再煮至浓稠。', en: 'Off heat, melt in roux, then simmer to thicken.', ja: '火を止めてルーを溶かし、とろみが出るまで煮る。' },
        { zh: '盛在米饭上享用。', en: 'Serve over rice.', ja: 'ご飯にかけていただく。' }
      ],
      vocab: ['beef', 'onion', 'simmer', 'stir-fry']
    },
    {
      id: 'r-crepe', emoji: '🥞', color: '#FFE7F0', accent: '#C9517A',
      name: { zh: '法式可丽饼', en: 'French Crêpe', ja: 'フレンチクレープ' },
      cuisine: '西餐', tags: ['甜点', '早餐'], difficulty: 2, time: 30, servings: 4,
      unlockXp: 150, xpReward: 35,
      intro: {
        zh: '薄如蝉翼的饼皮，裹上草莓与奶油。',
        en: 'Paper-thin crêpes filled with strawberries and cream.',
        ja: '薄く焼いた生地に苺とクリームを巻いたデザート。'
      },
      ingredients: [
        { zh: '面粉', en: 'flour', ja: '小麦粉', amount: '100g / 100g / 100g' },
        { zh: '鸡蛋', en: 'egg', ja: '卵', amount: '2 个 / 2 / 2個' },
        { zh: '牛奶', en: 'milk', ja: '牛乳', amount: '250ml / 250ml / 250ml' },
        { zh: '黄油', en: 'butter', ja: 'バター', amount: '20g / 20g / 20g' },
        { zh: '草莓', en: 'strawberry', ja: 'いちご', amount: '适量 / to taste / 適量' }
      ],
      steps: [
        { zh: '面粉、鸡蛋、牛奶搅拌成无颗粒面糊。', en: 'Whisk flour, eggs and milk into a smooth batter.', ja: '小麦粉・卵・牛乳をダマがなくなるまで混ぜる。' },
        { zh: '融化黄油拌入面糊，静置 15 分钟。', en: 'Melt butter into batter; rest 15 minutes.', ja: '溶かしバターを混ぜ、15分休ませる。' },
        { zh: '平底锅倒入薄层面糊，煎至两面金黄。', en: 'Pour a thin layer; cook both sides until golden.', ja: '薄く生地を流し、両面焼く。' },
        { zh: '抹奶油、放草莓，卷起享用。', en: 'Spread cream, add strawberries, roll up.', ja: 'クリームと苺をのせて巻く。' }
      ],
      vocab: ['flour', 'egg', 'butter', 'milk', 'mix']
    },
    {
      id: 'r-tom-yum', emoji: '🍜', color: '#FBE0DA', accent: '#D94B2F',
      name: { zh: '泰式冬阴功汤', en: 'Tom Yum Soup', ja: 'トムヤムスープ' },
      cuisine: '东南亚', tags: ['汤品', '酸辣'], difficulty: 3, time: 40, servings: 2,
      unlockXp: 200, xpReward: 40,
      intro: {
        zh: '酸辣鲜香的泰式灵魂，一碗唤醒味蕾。',
        en: 'Thailand\'s soul — hot, sour and aromatic in one bowl.',
        ja: 'タイのソウルフード。辛く酸っぱい香り高いスープ。'
      },
      ingredients: [
        { zh: '虾', en: 'shrimp', ja: '海老', amount: '200g / 200g / 200g' },
        { zh: '香茅', en: 'lemongrass', ja: 'レモングラス', amount: '2 根 / 2 / 2本' },
        { zh: '南姜', en: 'galangal', ja: 'ガランガル', amount: '少许 / a little / 少々' },
        { zh: '辣椒', en: 'chili', ja: '唐辛子', amount: '2 个 / 2 / 2本' },
        { zh: '青柠', en: 'lime', ja: 'ライム', amount: '1 个 / 1 / 1個' }
      ],
      steps: [
        { zh: '香茅、南姜、辣椒拍碎煮成汤底。', en: 'Bruise lemongrass, galangal, chili; simmer a broth.', ja: 'レモングラスなどを叩いて煮出す。' },
        { zh: '加入蘑菇与虾煮至变色。', en: 'Add mushrooms and shrimp; cook until pink.', ja: 'キノコと海老を加え、火が通るまで煮る。' },
        { zh: '关火，挤入青柠汁调味。', en: 'Off heat, squeeze in lime juice.', ja: '火を止め、ライムを搾る。' },
        { zh: '撒香菜，趁热享用。', en: 'Garnish with cilantro; serve hot.', ja: 'パクチーを散らし、熱いうちに。' }
      ],
      vocab: ['shrimp', 'chili', 'spicy', 'sour', 'simmer']
    },
    {
      id: 'r-tiramisu', emoji: '🍰', color: '#EFE2D0', accent: '#7A4E2B',
      name: { zh: '提拉米苏', en: 'Tiramisu', ja: 'ティラミス' },
      cuisine: '西餐', tags: ['甜点', '免烤'], difficulty: 3, time: 50, servings: 6,
      unlockXp: 250, xpReward: 40,
      intro: {
        zh: '咖啡与马斯卡彭的浪漫，"带我走"的甜蜜。',
        en: 'Coffee and mascarpone romance — "pick me up" in every bite.',
        ja: 'コーヒーとマスカルポーネの甘いデザート。'
      },
      ingredients: [
        { zh: '马斯卡彭', en: 'mascarpone', ja: 'マスカルポーネ', amount: '250g / 250g / 250g' },
        { zh: '手指饼干', en: 'ladyfingers', ja: 'ビスケット', amount: '1 包 / 1 pack / 1袋' },
        { zh: '浓缩咖啡', en: 'espresso', ja: 'エスプレッソ', amount: '200ml / 200ml / 200ml' },
        { zh: '鸡蛋', en: 'egg', ja: '卵', amount: '3 个 / 3 / 3個' },
        { zh: '可可粉', en: 'cocoa', ja: 'ココア', amount: '适量 / to taste / 適量' }
      ],
      steps: [
        { zh: '蛋黄加糖打发，拌入马斯卡彭。', en: 'Whisk yolks with sugar; fold in mascarpone.', ja: '卵黄と砂糖を泡立て、マスカルポーネを混ぜる。' },
        { zh: '蛋白打发后轻轻拌入奶酪糊。', en: 'Whip egg whites; gently fold into the cheese mix.', ja: 'メレンゲを作り、チーズクリームに合わせる。' },
        { zh: '饼干蘸咖啡铺底，铺一层奶酪糊。', en: 'Dip biscuits in espresso, layer with cream.', ja: 'ビスケットをコーヒーに浸し、クリームを層にする。' },
        { zh: '重复铺层，冷藏 4 小时，撒可可粉。', en: 'Repeat layers; chill 4h; dust with cocoa.', ja: '繰り返し、4時間冷やしてココアを振る。' }
      ],
      vocab: ['egg', 'coffee', 'cheese', 'mix']
    },
    {
      id: 'r-tempura', emoji: '🍤', color: '#FFF0D1', accent: '#C8861E',
      name: { zh: '日式天妇罗', en: 'Tempura', ja: '天ぷら' },
      cuisine: '日料', tags: ['炸物', '主菜'], difficulty: 3, time: 40, servings: 2,
      unlockXp: 300, xpReward: 45,
      intro: {
        zh: '薄脆面衣锁住食材鲜甜，蘸天汁入口。',
        en: 'Crisp, light batter locking in sweetness — dip in tentsuyu.',
        ja: '薄くサクサクの衣。天つゆでいただく。'
      },
      ingredients: [
        { zh: '虾', en: 'shrimp', ja: '海老', amount: '8 只 / 8 / 8尾' },
        { zh: '红薯', en: 'sweet potato', ja: 'さつまいも', amount: '1 个 / 1 / 1本' },
        { zh: '茄子', en: 'eggplant', ja: 'なす', amount: '1 根 / 1 / 1本' },
        { zh: '面粉', en: 'flour', ja: '小麦粉', amount: '100g / 100g / 100g' },
        { zh: '鸡蛋', en: 'egg', ja: '卵', amount: '1 个 / 1 / 1個' }
      ],
      steps: [
        { zh: '虾去壳留尾，切几刀防止卷曲。', en: 'Peel shrimp leaving the tail; score to prevent curling.', ja: '海老の殻を尾を残してむき、筋を切る。' },
        { zh: '冰水、鸡蛋、面粉快速拌成面糊。', en: 'Whisk ice water, egg and flour quickly.', ja: '冷水・卵・小麦粉を手早く混ぜる。' },
        { zh: '食材裹面糊，170°C 油炸至金黄。', en: 'Coat ingredients; fry at 170°C until golden.', ja: '衣をつけ、170°Cで揚げる。' },
        { zh: '沥油，配天汁与萝卜泥上桌。', en: 'Drain; serve with tentsuyu and grated daikon.', ja: '油を切り、天つゆと大根おろしで。' }
      ],
      vocab: ['shrimp', 'flour', 'egg', 'fry']
    },
    {
      id: 'r-tacos', emoji: '🌮', color: '#FFE6CC', accent: '#D97706',
      name: { zh: '墨西哥塔可', en: 'Tacos', ja: 'タコス' },
      cuisine: '拉美', tags: ['主菜', '手抓'], difficulty: 2, time: 35, servings: 3,
      unlockXp: 380, xpReward: 45,
      intro: {
        zh: '玉米饼卷起肉与莎莎酱，一口奔放。',
        en: 'Corn tortillas stuffed with meat and salsa — a bold bite.',
        ja: 'トルティーヤに肉とサルサを巻いたメキシカン。'
      },
      ingredients: [
        { zh: '玉米饼', en: 'tortilla', ja: 'トルティーヤ', amount: '6 张 / 6 / 6枚' },
        { zh: '牛肉末', en: 'beef', ja: '牛肉', amount: '250g / 250g / 250g' },
        { zh: '番茄', en: 'tomato', ja: 'トマト', amount: '2 个 / 2 / 2個' },
        { zh: '洋葱', en: 'onion', ja: '玉ねぎ', amount: '半个 / ½ / 1/2個' },
        { zh: '香菜', en: 'cilantro', ja: 'パクチー', amount: '少许 / a handful / 少々' }
      ],
      steps: [
        { zh: '牛肉末炒香，加入孜然与辣椒粉。', en: 'Brown beef with cumin and chili powder.', ja: '牛ひき肉を炒め、クミンとチリパウダーを加える。' },
        { zh: '番茄、洋葱、香菜切碎做莎莎酱。', en: 'Dice tomato, onion, cilantro for salsa.', ja: 'トマト・玉ねぎ・パクチーを刻んでサルサに。' },
        { zh: '玉米饼加热，铺上肉与莎莎酱。', en: 'Warm tortillas; fill with meat and salsa.', ja: 'トルティーヤを温め、肉とサルサをのせる。' },
        { zh: '挤上青柠汁，卷起享用。', en: 'Squeeze lime and roll up.', ja: 'ライムを搾って巻く。' }
      ],
      vocab: ['beef', 'tomato', 'onion', 'stir-fry']
    },
    {
      id: 'r-budae-jjigae', emoji: '🍲', color: '#FFD6CC', accent: '#B23B2E',
      name: { zh: '韩式部队锅', en: 'Budae Jjigae', ja: 'プデチゲ' },
      cuisine: '韩餐', tags: ['汤锅', '聚餐'], difficulty: 2, time: 40, servings: 3,
      unlockXp: 450, xpReward: 50,
      intro: {
        zh: '香肠、午餐肉与泡菜在辣汤里翻滚，热闹温暖。',
        en: 'Sausage, spam and kimchi bubbling in a spicy broth.',
        ja: 'ソーセージやキムチが辛いスープで煮込まれた鍋。'
      },
      ingredients: [
        { zh: '泡菜', en: 'kimchi', ja: 'キムチ', amount: '200g / 200g / 200g' },
        { zh: '午餐肉', en: 'spam', ja: 'スパム', amount: '1 罐 / 1 can / 1缶' },
        { zh: '香肠', en: 'sausage', ja: 'ソーセージ', amount: '4 根 / 4 / 4本' },
        { zh: '韩式辣酱', en: 'gochujang', ja: 'コチュジャン', amount: '2 勺 / 2 tbsp / 大さじ2' },
        { zh: '方便面', en: 'ramen', ja: 'ラーメン', amount: '1 包 / 1 pack / 1袋' }
      ],
      steps: [
        { zh: '午餐肉、香肠切片，泡菜切段。', en: 'Slice spam and sausage; cut kimchi.', ja: 'スパムとソーセージを切り、キムチを食べやすく。' },
        { zh: '锅中铺食材，加水与辣酱煮开。', en: 'Arrange in a pot; add water and gochujang; boil.', ja: '鍋に並べ、水とコチュジャンで煮立てる。' },
        { zh: '加入面饼与芝士，煮至软糯。', en: 'Add ramen and cheese; cook until soft.', ja: '麺とチーズを加え、柔らかくなるまで煮る。' }
      ],
      vocab: ['spicy', 'simmer', 'cheese']
    },
    {
      id: 'r-creme-brulee', emoji: '🍮', color: '#FDE6C8', accent: '#9A5B14',
      name: { zh: '法式焦糖布丁', en: 'Crème Brûlée', ja: 'クレームブリュレ' },
      cuisine: '西餐', tags: ['甜点'], difficulty: 3, time: 60, servings: 4,
      unlockXp: 550, xpReward: 55,
      intro: {
        zh: '敲开焦糖壳，是丝滑冰凉的奶油心。',
        en: 'Crack the caramel shell to reveal silky cold custard.',
        ja: 'カリッとした飴の下は、なめらかなカスタード。'
      },
      ingredients: [
        { zh: '奶油', en: 'cream', ja: 'クリーム', amount: '400ml / 400ml / 400ml' },
        { zh: '蛋黄', en: 'egg yolk', ja: '卵黄', amount: '5 个 / 5 / 5個' },
        { zh: '糖', en: 'sugar', ja: '砂糖', amount: '80g / 80g / 80g' },
        { zh: '香草荚', en: 'vanilla', ja: 'バニラ', amount: '1 根 / 1 / 1本' }
      ],
      steps: [
        { zh: '奶油加香草煮至微沸。', en: 'Heat cream with vanilla until just simmering.', ja: 'クリームとバニラを弱火で温める。' },
        { zh: '蛋黄与糖打发，慢慢冲入热奶油。', en: 'Whisk yolks and sugar; slowly pour in hot cream.', ja: '卵黄と砂糖を泡立て、クリームを少しずつ加える。' },
        { zh: '过筛入模，水浴 160°C 烤 30 分钟。', en: 'Strain into ramekins; bake in water bath 30 min.', ja: '型に漉し入れ、湯煎で30分焼く。' },
        { zh: '冷藏后撒糖，用喷枪烤出焦糖壳。', en: 'Chill, dust sugar, torch to a caramel crust.', ja: '冷やして砂糖を振り、バーナーで焼き色を。' }
      ],
      vocab: ['sugar', 'egg', 'bake', 'milk']
    }
  ],

  /* ----------------------------- 调酒 ----------------------------- */
  cocktails: [
    {
      id: 'c-mojito', emoji: '🍹', color: '#DFF5E0', accent: '#3BA756',
      name: { zh: '莫吉托', en: 'Mojito', ja: 'モヒート' },
      category: '经典', tags: ['清爽', '朗姆酒'], difficulty: 1, time: 8,
      unlockXp: 0, xpReward: 20,
      intro: {
        zh: '薄荷与青柠的清凉，海明威的最爱。',
        en: 'Cool mint and lime — Hemingway\'s favorite.',
        ja: 'ミントとライムの爽やかなカクテル。'
      },
      ingredients: [
        { zh: '白朗姆酒', en: 'white rum', ja: 'ホワイトラム', amount: '50ml / 50ml / 50ml' },
        { zh: '青柠', en: 'lime', ja: 'ライム', amount: '半个 / ½ / 1/2個' },
        { zh: '薄荷叶', en: 'mint', ja: 'ミント', amount: '10 片 / 10 / 10枚' },
        { zh: '苏打水', en: 'soda water', ja: 'ソーダ', amount: '适量 / to top / 適量' },
        { zh: '糖', en: 'sugar', ja: '砂糖', amount: '2 勺 / 2 tsp / 小さじ2' }
      ],
      steps: [
        { zh: '杯中放青柠块、薄荷与糖，轻轻捣压。', en: 'Muddle lime, mint and sugar gently.', ja: 'ライム・ミント・砂糖を軽くつぶす。' },
        { zh: '加入朗姆酒与碎冰，搅拌。', en: 'Add rum and crushed ice; stir.', ja: 'ラムとクラッシュアイスを加えて混ぜる。' },
        { zh: '注满苏打水，用薄荷与青柠装饰。', en: 'Top with soda; garnish with mint and lime.', ja: 'ソーダで満たし、飾り付ける。' }
      ],
      vocab: ['lemon', 'sugar', 'mix', 'water']
    },
    {
      id: 'c-gin-tonic', emoji: '🍸', color: '#E6F2E2', accent: '#4C8A3E',
      name: { zh: '金汤力', en: 'Gin & Tonic', ja: 'ジントニック' },
      category: '经典', tags: ['清爽', '金酒'], difficulty: 1, time: 5,
      unlockXp: 0, xpReward: 15,
      intro: {
        zh: '极简的经典，气泡中绽放草本香气。',
        en: 'A minimalist classic — herbal notes over bubbles.',
        ja: '最もシンプルな定番。炭酸で香りが広がる。'
      },
      ingredients: [
        { zh: '金酒', en: 'gin', ja: 'ジン', amount: '45ml / 45ml / 45ml' },
        { zh: '汤力水', en: 'tonic water', ja: 'トニックウォーター', amount: '120ml / 120ml / 120ml' },
        { zh: '青柠', en: 'lime', ja: 'ライム', amount: '1 角 / 1 wedge / 1切れ' },
        { zh: '冰块', en: 'ice', ja: 'アイス', amount: '适量 / to taste / 適量' }
      ],
      steps: [
        { zh: '杯中加满冰块。', en: 'Fill a glass with ice.', ja: 'グラスに氷を満たす。' },
        { zh: '倒入金酒，再缓缓注满汤力水。', en: 'Pour gin, then top gently with tonic.', ja: 'ジンを注ぎ、トニックを静かに満たす。' },
        { zh: '轻搅一下，放入青柠角。', en: 'Stir gently and add the lime wedge.', ja: 'そっと混ぜ、ライムを添える。' }
      ],
      vocab: ['lemon', 'water', 'mix']
    },
    {
      id: 'c-highball', emoji: '🥃', color: '#F2E6D3', accent: '#8A5A2B',
      name: { zh: '嗨棒', en: 'Whisky Highball', ja: 'ハイボール' },
      category: '经典', tags: ['清爽', '威士忌'], difficulty: 1, time: 5,
      unlockXp: 0, xpReward: 15,
      intro: {
        zh: '威士忌兑苏打，日式居酒屋的国民饮法。',
        en: 'Whisky lengthened with soda — Japan\'s pub staple.',
        ja: 'ウイスキーをソーダで割った、日本の定番。'
      },
      ingredients: [
        { zh: '威士忌', en: 'whisky', ja: 'ウイスキー', amount: '45ml / 45ml / 45ml' },
        { zh: '苏打水', en: 'soda water', ja: 'ソーダ', amount: '135ml / 135ml / 135ml' },
        { zh: '柠檬皮', en: 'lemon peel', ja: 'レモンの皮', amount: '1 条 / 1 twist / 1本' }
      ],
      steps: [
        { zh: '冰凉的杯中加冰，倒入威士忌。', en: 'Add ice to a chilled glass; pour whisky.', ja: '冷やしたグラスに氷とウイスキーを。' },
        { zh: '沿杯壁缓慢注满苏打水。', en: 'Slowly top with soda down the side.', ja: 'ソーダをゆっくり満たす。' },
        { zh: '用柠檬皮挤出精油，轻搅。', en: 'Express lemon peel over the glass; stir.', ja: 'レモンの皮を搾り、軽く混ぜる。' }
      ],
      vocab: ['lemon', 'water', 'mix']
    },
    {
      id: 'c-margarita', emoji: '🍸', color: '#FBEFCB', accent: '#C69A12',
      name: { zh: '玛格丽特', en: 'Margarita', ja: 'マルガリータ' },
      category: '果味', tags: ['龙舌兰', '酸'], difficulty: 2, time: 10,
      unlockXp: 120, xpReward: 30,
      intro: {
        zh: '盐边杯口，龙舌兰与青柠的热烈拥抱。',
        en: 'A salt-rimmed embrace of tequila and lime.',
        ja: '塩の縁とテキーラ、ライムのカクテル。'
      },
      ingredients: [
        { zh: '龙舌兰', en: 'tequila', ja: 'テキーラ', amount: '50ml / 50ml / 50ml' },
        { zh: '青柠汁', en: 'lime juice', ja: 'ライムジュース', amount: '25ml / 25ml / 25ml' },
        { zh: '橙味利口酒', en: 'triple sec', ja: 'トリプルセック', amount: '20ml / 20ml / 20ml' },
        { zh: '盐', en: 'salt', ja: '塩', amount: '适量 / to rim / 適量' }
      ],
      steps: [
        { zh: '杯口用青柠擦湿，蘸一圈盐。', en: 'Wet the rim with lime and dip in salt.', ja: 'グラスの縁をライムで湿らせ、塩をつける。' },
        { zh: '所有酒与冰块摇匀。', en: 'Shake all liquids with ice.', ja: '材料と氷をシェイクする。' },
        { zh: '滤入盐边杯中，用青柠装饰。', en: 'Strain into the glass; garnish with lime.', ja: 'グラスに注ぎ、ライムで飾る。' }
      ],
      vocab: ['lemon', 'salt', 'mix']
    },
    {
      id: 'c-long-island', emoji: '🧊', color: '#E7EFE0', accent: '#5B7A3A',
      name: { zh: '长岛冰茶', en: 'Long Island Iced Tea', ja: 'ロングアイランドアイスティー' },
      category: '烈性', tags: ['烈酒'], difficulty: 3, time: 10,
      unlockXp: 180, xpReward: 35,
      intro: {
        zh: '五种基酒的狂欢，看似冰茶实则浓烈。',
        en: 'Five spirits in one glass — looks like iced tea, hits harder.',
        ja: '5種のお酒が入った強いカクテル。'
      },
      ingredients: [
        { zh: '伏特加', en: 'vodka', ja: 'ウォッカ', amount: '15ml / 15ml / 15ml' },
        { zh: '朗姆酒', en: 'rum', ja: 'ラム', amount: '15ml / 15ml / 15ml' },
        { zh: '金酒', en: 'gin', ja: 'ジン', amount: '15ml / 15ml / 15ml' },
        { zh: '龙舌兰', en: 'tequila', ja: 'テキーラ', amount: '15ml / 15ml / 15ml' },
        { zh: '可乐', en: 'cola', ja: 'コーラ', amount: '适量 / to top / 適量' }
      ],
      steps: [
        { zh: '高杯中加满冰，倒入四种基酒与柠檬汁。', en: 'Add ice; pour in the four spirits and lemon juice.', ja: '氷を入れ、4種の酒とレモン汁を注ぐ。' },
        { zh: '注满可乐，轻搅。', en: 'Top with cola and stir gently.', ja: 'コーラで満たし、軽く混ぜる。' },
        { zh: '用柠檬片装饰。', en: 'Garnish with a lemon slice.', ja: 'レモンを添える。' }
      ],
      vocab: ['lemon', 'mix']
    },
    {
      id: 'c-yuzu-sour', emoji: '🍋', color: '#FFF2C4', accent: '#D9A618',
      name: { zh: '柚子苏打', en: 'Yuzu Sour', ja: '柚子サワー' },
      category: '果味', tags: ['日式', '清爽'], difficulty: 1, time: 8,
      unlockXp: 220, xpReward: 30,
      intro: {
        zh: '日本柚子的清香，酸甜清爽的一杯。',
        en: 'Bright yuzu citrus — a clean, tangy highball.',
        ja: '柚子の香りが爽やかな、甘酸っぱい一杯。'
      },
      ingredients: [
        { zh: '柚子酒', en: 'yuzu liqueur', ja: '柚子酒', amount: '45ml / 45ml / 45ml' },
        { zh: '苏打水', en: 'soda water', ja: 'ソーダ', amount: '90ml / 90ml / 90ml' },
        { zh: '柚子皮', en: 'yuzu peel', ja: '柚子の皮', amount: '少许 / a little / 少々' }
      ],
      steps: [
        { zh: '杯中加冰，倒入柚子酒。', en: 'Add ice; pour in the yuzu liqueur.', ja: '氷を入れ、柚子酒を注ぐ。' },
        { zh: '注满苏打水，轻搅。', en: 'Top with soda and stir gently.', ja: 'ソーダで満たし、軽く混ぜる。' },
        { zh: '放一片柚子皮提香。', en: 'Add a twist of yuzu peel.', ja: '柚子の皮を添える。' }
      ],
      vocab: ['lemon', 'water', 'mix']
    },
    {
      id: 'c-negroni', emoji: '🍷', color: '#F0D2D2', accent: '#A83232',
      name: { zh: '内格罗尼', en: 'Negroni', ja: 'ネグローニ' },
      category: '经典', tags: ['苦味', '餐前'], difficulty: 2, time: 6,
      unlockXp: 280, xpReward: 35,
      intro: {
        zh: '等份金酒、苦艾酒与金巴利，苦甜平衡。',
        en: 'Equal parts gin, vermouth and Campari — bitter-sweet balance.',
        ja: 'ジン、ベルモット、カンパーリの苦みある一杯。'
      },
      ingredients: [
        { zh: '金酒', en: 'gin', ja: 'ジン', amount: '30ml / 30ml / 30ml' },
        { zh: '甜味美思', en: 'sweet vermouth', ja: 'スイートベルモット', amount: '30ml / 30ml / 30ml' },
        { zh: '金巴利', en: 'campari', ja: 'カンパーリ', amount: '30ml / 30ml / 30ml' },
        { zh: '橙皮', en: 'orange peel', ja: 'オレンジの皮', amount: '1 条 / 1 twist / 1本' }
      ],
      steps: [
        { zh: '杯中加冰，倒入三种酒。', en: 'Add ice; pour in the three spirits.', ja: '氷を入れ、3種を注ぐ。' },
        { zh: '搅拌约 20 秒至冰凉。', en: 'Stir for about 20 seconds until chilled.', ja: '20秒ほどよく混ぜる。' },
        { zh: '挤入橙皮精油，放入装饰。', en: 'Express the orange peel and drop it in.', ja: 'オレンジの皮を搾り、添える。' }
      ],
      vocab: ['bitter', 'mix']
    },
    {
      id: 'c-pina-colada', emoji: '🍍', color: '#FFF1D6', accent: '#D9971A',
      name: { zh: '椰林飘香', en: 'Piña Colada', ja: 'ピニャコラーダ' },
      category: '果味', tags: ['朗姆酒', '热带'], difficulty: 2, time: 10,
      unlockXp: 350, xpReward: 40,
      intro: {
        zh: '菠萝与椰奶的热带风情，像海边假日。',
        en: 'Pineapple and coconut — a tropical beach holiday in a glass.',
        ja: 'パイナップルとココナッツのトロピカルカクテル。'
      },
      ingredients: [
        { zh: '白朗姆酒', en: 'white rum', ja: 'ホワイトラム', amount: '50ml / 50ml / 50ml' },
        { zh: '菠萝汁', en: 'pineapple juice', ja: 'パイナップルジュース', amount: '80ml / 80ml / 80ml' },
        { zh: '椰奶', en: 'coconut milk', ja: 'ココナッツミルク', amount: '50ml / 50ml / 50ml' },
        { zh: '菠萝角', en: 'pineapple wedge', ja: 'パイナップル', amount: '1 块 / 1 / 1個' }
      ],
      steps: [
        { zh: '所有材料与冰块倒入搅拌机。', en: 'Blend all ingredients with ice.', ja: '材料と氷をミキサーに。' },
        { zh: '打至顺滑，倒入杯中。', en: 'Blend until smooth; pour into a glass.', ja: '滑らかになるまで混ぜ、注ぐ。' },
        { zh: '用菠萝角与樱桃装饰。', en: 'Garnish with pineapple and cherry.', ja: 'パイナップルで飾る。' }
      ],
      vocab: ['juice', 'mix']
    },
    {
      id: 'c-old-fashioned', emoji: '🥃', color: '#EFE0C4', accent: '#7A4E2B',
      name: { zh: '古典鸡尾酒', en: 'Old Fashioned', ja: 'オールドファッション' },
      category: '烈性', tags: ['威士忌', '经典'], difficulty: 2, time: 8,
      unlockXp: 420, xpReward: 45,
      intro: {
        zh: '威士忌鸡尾酒的鼻祖，纯粹而隽永。',
        en: 'The grandfather of whisky cocktails — pure and timeless.',
        ja: 'ウイスキーカクテルの原点。奥深い一杯。'
      },
      ingredients: [
        { zh: '波本威士忌', en: 'bourbon', ja: 'バーボン', amount: '60ml / 60ml / 60ml' },
        { zh: '安格式苦精', en: 'angostura bitters', ja: 'アンゴスチュラ', amount: '2 滴 / 2 dashes / 2滴' },
        { zh: '方糖', en: 'sugar cube', ja: '角砂糖', amount: '1 块 / 1 / 1個' },
        { zh: '橙皮', en: 'orange peel', ja: 'オレンジの皮', amount: '1 条 / 1 twist / 1本' }
      ],
      steps: [
        { zh: '方糖加苦精与少许水，在杯中捣化。', en: 'Muddle sugar cube with bitters and a splash of water.', ja: '角砂糖をビターズと水で溶かす。' },
        { zh: '加冰与威士忌，搅拌 30 秒。', en: 'Add ice and bourbon; stir 30 seconds.', ja: '氷とバーボンを加え、30秒混ぜる。' },
        { zh: '挤入橙皮精油，放入大冰块。', en: 'Express orange peel; add a large ice cube.', ja: 'オレンジの皮を搾り、大きな氷を入れる。' }
      ],
      vocab: ['bitter', 'mix', 'water']
    }
  ],

  /* ----------------------------- 词汇 ----------------------------- */
  vocab: {
    // 食材
    tomato:    { en: 'tomato',    ja: 'トマト',       zh: '番茄',   pron: { en: '/təˈmɑːtəʊ/', ja: 'tomato' },   cat: 'ingredient' },
    egg:       { en: 'egg',       ja: '卵（たまご）', zh: '鸡蛋',   pron: { en: '/eɡ/',        ja: 'tamago' },   cat: 'ingredient' },
    rice:      { en: 'rice',      ja: 'ご飯（ごはん）', zh: '米饭',  pron: { en: '/raɪs/',      ja: 'gohan' },    cat: 'ingredient' },
    noodle:    { en: 'noodle',    ja: '麺（めん）',   zh: '面条',   pron: { en: '/ˈnuːdl/',    ja: 'men' },      cat: 'ingredient' },
    fish:      { en: 'fish',      ja: '魚（さかな）', zh: '鱼',     pron: { en: '/fɪʃ/',       ja: 'sakana' },   cat: 'ingredient' },
    meat:      { en: 'meat',      ja: '肉（にく）',   zh: '肉',     pron: { en: '/miːt/',      ja: 'niku' },     cat: 'ingredient' },
    chicken:   { en: 'chicken',   ja: '鶏肉（とりにく）', zh: '鸡肉', pron: { en: '/ˈtʃɪkɪn/', ja: 'toriniku' }, cat: 'ingredient' },
    beef:      { en: 'beef',      ja: '牛肉（ぎゅうにく）', zh: '牛肉', pron: { en: '/biːf/', ja: 'gyuuniku' }, cat: 'ingredient' },
    shrimp:    { en: 'shrimp',    ja: '海老（えび）', zh: '虾',     pron: { en: '/ʃrɪmp/',     ja: 'ebi' },      cat: 'ingredient' },
    vegetable: { en: 'vegetable', ja: '野菜（やさい）', zh: '蔬菜', pron: { en: '/ˈvedʒtəbl/', ja: 'yasai' },   cat: 'ingredient' },
    onion:     { en: 'onion',     ja: '玉ねぎ（たまねぎ）', zh: '洋葱', pron: { en: '/ˈʌnjən/', ja: 'tamanegi' }, cat: 'ingredient' },
    garlic:    { en: 'garlic',    ja: 'ニンニク',     zh: '大蒜',   pron: { en: '/ˈɡɑːlɪk/',   ja: 'ninniku' },  cat: 'ingredient' },
    ginger:    { en: 'ginger',    ja: '生姜（しょうが）', zh: '姜',  pron: { en: '/ˈdʒɪndʒə/', ja: 'shouga' },   cat: 'ingredient' },
    chili:     { en: 'chili',     ja: '唐辛子（とうがらし）', zh: '辣椒', pron: { en: '/ˈtʃɪli/', ja: 'tougarashi' }, cat: 'ingredient' },
    tofu:      { en: 'tofu',      ja: '豆腐（とうふ）', zh: '豆腐',  pron: { en: '/ˈtəʊfuː/',   ja: 'toufu' },    cat: 'ingredient' },
    mushroom:  { en: 'mushroom',  ja: 'キノコ',       zh: '蘑菇',   pron: { en: '/ˈmʌʃruːm/',  ja: 'kinoko' },   cat: 'ingredient' },
    cheese:    { en: 'cheese',    ja: 'チーズ',       zh: '奶酪',   pron: { en: '/tʃiːz/',     ja: 'chiizu' },   cat: 'ingredient' },
    butter:    { en: 'butter',    ja: 'バター',       zh: '黄油',   pron: { en: '/ˈbʌtə/',     ja: 'bataa' },    cat: 'ingredient' },
    flour:     { en: 'flour',     ja: '小麦粉（こむぎこ）', zh: '面粉', pron: { en: '/ˈflaʊə/', ja: 'komugiko' }, cat: 'ingredient' },
    sugar:     { en: 'sugar',     ja: '砂糖（さとう）', zh: '糖',    pron: { en: '/ˈʃʊɡə/',    ja: 'satou' },    cat: 'ingredient' },
    salt:      { en: 'salt',      ja: '塩（しお）',   zh: '盐',     pron: { en: '/sɔːlt/',     ja: 'shio' },     cat: 'ingredient' },
    'soy sauce': { en: 'soy sauce', ja: '醤油（しょうゆ）', zh: '酱油', pron: { en: '/sɔɪ sɔːs/', ja: 'shouyu' }, cat: 'ingredient' },
    vinegar:   { en: 'vinegar',   ja: '酢（す）',     zh: '醋',     pron: { en: '/ˈvɪnɪɡə/',   ja: 'su' },       cat: 'ingredient' },
    oil:       { en: 'oil',       ja: '油（あぶら）', zh: '油',     pron: { en: '/ɔɪl/',       ja: 'abura' },    cat: 'ingredient' },
    milk:      { en: 'milk',      ja: '牛乳（ぎゅうにゅう）', zh: '牛奶', pron: { en: '/mɪlk/', ja: 'gyuunyuu' }, cat: 'ingredient' },
    lemon:     { en: 'lemon',     ja: 'レモン',       zh: '柠檬',   pron: { en: '/ˈlemən/',    ja: 'remon' },    cat: 'ingredient' },
    scallion:  { en: 'scallion',  ja: 'ねぎ',         zh: '葱',     pron: { en: '/ˈskæliən/',  ja: 'negi' },     cat: 'ingredient' },
    miso:      { en: 'miso',      ja: '味噌（みそ）', zh: '味噌',   pron: { en: '/ˈmiːsəʊ/',   ja: 'miso' },     cat: 'ingredient' },

    // 烹饪动作
    chop:      { en: 'chop',      ja: '切る（きる）', zh: '切',     pron: { en: '/tʃɒp/',      ja: 'kiru' },     cat: 'verb' },
    boil:      { en: 'boil',      ja: '茹でる（ゆでる）', zh: '煮/焯', pron: { en: '/bɔɪl/',    ja: 'yuderu' },   cat: 'verb' },
    fry:       { en: 'fry',       ja: '揚げる（あげる）', zh: '炸',   pron: { en: '/fraɪ/',     ja: 'ageru' },    cat: 'verb' },
    'stir-fry': { en: 'stir-fry', ja: '炒める（いためる）', zh: '翻炒', pron: { en: '/ˈstɜː fraɪ/', ja: 'itameru' }, cat: 'verb' },
    steam:     { en: 'steam',     ja: '蒸す（むす）', zh: '蒸',     pron: { en: '/stiːm/',     ja: 'musu' },     cat: 'verb' },
    bake:      { en: 'bake',      ja: '焼く（やく）', zh: '烤/煎',  pron: { en: '/beɪk/',      ja: 'yaku' },     cat: 'verb' },
    mix:       { en: 'mix',       ja: '混ぜる（まぜる）', zh: '混合', pron: { en: '/mɪks/',     ja: 'mazeru' },   cat: 'verb' },
    simmer:    { en: 'simmer',    ja: '煮込む（にこむ）', zh: '炖/小火煮', pron: { en: '/ˈsɪmə/', ja: 'nikomu' }, cat: 'verb' },

    // 味道
    sweet:     { en: 'sweet',     ja: '甘い（あまい）', zh: '甜的',   pron: { en: '/swiːt/',     ja: 'amai' },     cat: 'taste' },
    salty:     { en: 'salty',     ja: '塩辛い（しおからい）', zh: '咸的', pron: { en: '/ˈsɔːlti/', ja: 'shiokarai' }, cat: 'taste' },
    sour:      { en: 'sour',      ja: '酸っぱい（すっぱい）', zh: '酸的', pron: { en: '/ˈsaʊə/', ja: 'suppai' }, cat: 'taste' },
    bitter:    { en: 'bitter',    ja: '苦い（にがい）', zh: '苦的',  pron: { en: '/ˈbɪtə/',     ja: 'nigai' },    cat: 'taste' },
    spicy:     { en: 'spicy',     ja: '辛い（からい）', zh: '辣的',  pron: { en: '/ˈspaɪsi/',   ja: 'karai' },    cat: 'taste' },
    delicious: { en: 'delicious', ja: '美味しい（おいしい）', zh: '好吃', pron: { en: '/dɪˈlɪʃəs/', ja: 'oishii' }, cat: 'taste' },
    fresh:     { en: 'fresh',     ja: '新鮮（しんせん）', zh: '新鲜', pron: { en: '/freʃ/',     ja: 'shinsen' }, cat: 'taste' },

    // 饮品
    tea:       { en: 'tea',       ja: 'お茶（おちゃ）', zh: '茶',    pron: { en: '/tiː/',       ja: 'ocha' },     cat: 'drink' },
    coffee:    { en: 'coffee',    ja: 'コーヒー',     zh: '咖啡',   pron: { en: '/ˈkɒfi/',     ja: 'koohii' },   cat: 'drink' },
    juice:     { en: 'juice',     ja: 'ジュース',     zh: '果汁',   pron: { en: '/dʒuːs/',     ja: 'juusu' },    cat: 'drink' },
    beer:      { en: 'beer',      ja: 'ビール',       zh: '啤酒',   pron: { en: '/bɪə/',       ja: 'biiru' },    cat: 'drink' },
    wine:      { en: 'wine',      ja: 'ワイン',       zh: '葡萄酒', pron: { en: '/waɪn/',      ja: 'wain' },     cat: 'drink' },
    water:     { en: 'water',     ja: '水（みず）',   zh: '水',     pron: { en: '/ˈwɔːtə/',    ja: 'mizu' },     cat: 'drink' },

    // 餐具
    bowl:      { en: 'bowl',      ja: '碗（わん）',   zh: '碗',     pron: { en: '/bəʊl/',      ja: 'wan' },      cat: 'tableware' },
    plate:     { en: 'plate',     ja: '皿（さら）',   zh: '盘子',   pron: { en: '/pleɪt/',     ja: 'sara' },     cat: 'tableware' },
    chopsticks:{ en: 'chopsticks',ja: '箸（はし）',   zh: '筷子',   pron: { en: '/ˈtʃɒpstɪks/', ja: 'hashi' },   cat: 'tableware' },
    spoon:     { en: 'spoon',     ja: 'スプーン',     zh: '勺子',   pron: { en: '/spuːn/',     ja: 'supuun' },   cat: 'tableware' },
    fork:      { en: 'fork',      ja: 'フォーク',     zh: '叉子',   pron: { en: '/fɔːk/',      ja: 'fooku' },    cat: 'tableware' },
    knife:     { en: 'knife',     ja: 'ナイフ',       zh: '刀',     pron: { en: '/naɪf/',      ja: 'naifu' },    cat: 'tableware' },
    glass:     { en: 'glass',     ja: 'グラス',       zh: '玻璃杯', pron: { en: '/ɡlɑːs/',     ja: 'gurasu' },   cat: 'tableware' }
  },

  /* ----------------------------- 课程 ----------------------------- */
  lessons: [
    { id: 'l1', icon: '🥬', color: '#DFF3D8', accent: '#4E9B3A',
      title: { zh: '食材入门', en: 'Basic Ingredients', ja: '食材の基礎' },
      desc:  { zh: '最常见的餐桌食材名称', en: 'The most common ingredients', ja: 'よく使う食材の名前' },
      vocabIds: ['tomato','egg','rice','noodle','fish','meat','chicken','beef','shrimp','vegetable','onion','garlic'] },
    { id: 'l2', icon: '🧄', color: '#FBE8C9', accent: '#D99A3B',
      title: { zh: '调味与香料', en: 'Seasoning & Spices', ja: '調味料とスパイス' },
      desc:  { zh: '让味道有层次的关键', en: 'The keys to layered flavor', ja: '味に深みを出す調味料' },
      vocabIds: ['ginger','chili','tofu','mushroom','cheese','butter','flour','sugar'] },
    { id: 'l3', icon: '🧂', color: '#F0E6D3', accent: '#8A6A3B',
      title: { zh: '基础调味', en: 'Basic Seasoning', ja: '基本の調味' },
      desc:  { zh: '调出咸鲜酸甜的四味', en: 'Salt, savory, sour & sweet', ja: '塩・うま味・酸味・甘み' },
      vocabIds: ['salt','soy sauce','vinegar','oil'] },
    { id: 'l4', icon: '👨‍🍳', color: '#FFE1BD', accent: '#B96B1F',
      title: { zh: '烹饪动作', en: 'Cooking Verbs', ja: '料理の動詞' },
      desc:  { zh: '菜谱里最常出现的动词', en: 'The verbs recipes use most', ja: 'レシピでよく出る動詞' },
      vocabIds: ['chop','boil','fry','stir-fry','steam','bake','mix','simmer'] },
    { id: 'l5', icon: '👅', color: '#FFE0E6', accent: '#C9486B',
      title: { zh: '味道描述', en: 'Describing Taste', ja: '味の表現' },
      desc:  { zh: '准确表达你的感受', en: 'Say exactly how it tastes', ja: '味を的確に伝える' },
      vocabIds: ['sweet','salty','sour','bitter','spicy','delicious','fresh'] },
    { id: 'l6', icon: '🍹', color: '#DFF1FB', accent: '#2E7FB8',
      title: { zh: '饮品与调酒', en: 'Drinks & Cocktails', ja: '飲み物とカクテル' },
      desc:  { zh: '餐桌上的饮品词汇', en: 'Drink words for the table', ja: 'テーブルの飲み物' },
      vocabIds: ['tea','coffee','juice','beer','wine','water'] },
    { id: 'l7', icon: '🍽️', color: '#EDE0F4', accent: '#7A4FB0',
      title: { zh: '餐桌用语', en: 'At the Table', ja: '食卓の言葉' },
      desc:  { zh: '餐具与用餐表达', en: 'Tableware and dining phrases', ja: '食器と食事の表現' },
      vocabIds: ['bowl','plate','chopsticks','spoon','fork','knife','glass'] }
  ],

  /* ----------------------------- 成就 ----------------------------- */
  achievements: [
    { id: 'a-first-cook',  icon: '🔥', title: { zh:'初出茅庐', en:'First Heat', ja:'初めての火' }, desc:{ zh:'完成第一道菜', en:'Cook your first dish', ja:'最初の一品を作る' } },
    { id: 'a-chef-5',      icon: '👨‍🍳', title:{ zh:'后厨新秀', en:'Rising Chef', ja:'シェフ見習い' }, desc:{ zh:'完成 5 道菜', en:'Cook 5 dishes', ja:'5品作る' } },
    { id: 'a-bartender',   icon: '🍸', title:{ zh:'调酒入门', en:'Home Bartender', ja:'バーテンダー入門' }, desc:{ zh:'调 1 杯酒', en:'Mix 1 cocktail', ja:'カクテルを1杯作る' } },
    { id: 'a-vocab-10',    icon: '📚', title:{ zh:'词汇积累', en:'Word Builder', ja:'単語マスター' }, desc:{ zh:'学习 10 个单词', en:'Learn 10 words', ja:'10語覚える' } },
    { id: 'a-quiz-master', icon: '🎯', title:{ zh:'满分达人', en:'Quiz Master', ja:'クイズ名人' }, desc:{ zh:'测验全对 3 次', en:'3 perfect quizzes', ja:'3回満点を取る' } },
    { id: 'a-xp-500',      icon: '⭐', title:{ zh:'味语达人', en:'WeiYu Master', ja:'味語マスター' }, desc:{ zh:'累计获得 500 XP', en:'Earn 500 XP', ja:'500 XP達成' } }
  ],

  /* 元数据：分类标签 */
  meta: {
    categories: { zh:'菜系', en:'Cuisine', ja:'料理' },
    levels: [
      { zh:'入门', en:'Easy', ja:'初級' },
      { zh:'进阶', en:'Medium', ja:'中級' },
      { zh:'挑战', en:'Hard', ja:'上級' }
    ]
  }
};
