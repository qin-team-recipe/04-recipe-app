import { prisma } from "../prisma";

export async function chefSeeder() {
  await prisma.chef.createMany({
    data: [
      {
        displayName: "山田シェフ",
        bio: "初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！ 絶賛発売中！",
        profileImage: "recipeapp/image_1_xqfhns",
      },
      {
        displayName: "佐藤太郎",
        bio: "モダンなフュージョン料理を得意とする若手シェフ。独創的な組み合わせと美しい盛り付けが特徴で、世界中の食通を魅了しています。地元の食材にもこだわり、地域の文化と融合させた料理を提供します。",
        profileImage: "recipeapp/image_1_1_s8bktj",
      },
      {
        displayName: "山田花子",
        bio: "伝統的な和食を独自のアレンジで提供する人気シェフ。古典的な技法と現代のクリエイティビティを組み合わせ、見た目にも美しい料理を生み出します。季節の恵みを活かし、旬の食材を大切に使った創作料理が評判です。",
        profileImage: "kazuo-ota-sF90YT-7ovI-unsplash_tvnat6",
      },
      {
        displayName: "Smith Johnson",
        bio: "インターナショナルな味わいを持つ世界的に有名なシェフ。世界各国の食文化に精通し、その多様性を取り入れた斬新な料理を提供します。常に進化し続ける食のトレンドをリードし、その才能と創造力で食卓を彩ります。",
        profileImage: "bluebird-provisions-lRAWcT7uwhY-unsplash_w36rhh",
      },
      {
        displayName: "Emma García",
        bio: "スペイン料理のエキスパートで、情熱的な料理スタイルが特徴。地中海の恵みと伝統的な調理法を融合させ、豊かな風味と華やかな見た目の料理を作り出します。スペインの食文化を広める使命感を持ち、その情熱は料理にも表れています。",
        profileImage: "derrick-pare-okPdcD03F7g-unsplash_la0sic",
      },
      {
        displayName: "Andrea Rossi",
        bio: "イタリア料理の名門出身で、伝統と創造性を融合させる技術を持つシェフ。家庭的で温かみのある料理から、高級レストランでの本格的なイタリアンまで幅広いジャンルに精通しています。素材の鮮度と風味を最大限に引き出し、愛情を込めた料理を提供します。",
        profileImage: "eiliv-aceron-wNQoaYCFcsI-unsplash_iq7mtr",
      },
      {
        displayName: "王小明",
        bio: "中華料理のスペシャリストで、独自のエッセンスを加えた創作料理が評判。伝統的な中国の技法を大切にしながら、新鮮な食材と調味料の絶妙なバランスが特徴です。豊かな味わいと華やかな盛り付けで、食欲をそそります。",
        profileImage: "rc-cf-FMh5o5m5N9E-unsplash_rppkav",
      },
      {
        displayName: "Alexandra Dupont",
        bio: "フランス料理のスタイルを尊重しながら、現代的なアプローチを取るフレンチシェフ。シンプルで洗練された料理に、斬新なアイデアを取り入れた独自のメニューを提供します。フレーバーパリングのマスターとして知られ、素材の持つ個性を引き立てます。",
        profileImage: "redcharlie-redcharlie1-t-7KEq9M0b0-unsplash_tuvohc",
      },
      {
        displayName: "Ravi Patel",
        bio: "インド料理のマスターで、スパイスの絶妙なバランスが魅力。伝統的なレシピを踏襲しつつ、独自の創造力で新しい味わいを生み出します。カレーやタンドリーなど、インドの多様な料理を幅広く提供し、本場の風味を楽しめます。",
        profileImage: "jopopz-tallorin-Rny5u2JwahI-unsplash_ulbgm9",
      },
      {
        displayName: "Miyuki Tanaka",
        bio: "ベジタリアン料理に特化し、季節の素材を活かした創作メニューを提案。豊かな野菜の風味とテクスチャーを引き出し、健康と美味しさを両立させます。持続可能な食材の使用にも力を入れ、環境に配慮した料理を提供します。",
        profileImage: "jouwen-wang-5-u7C5gy8r4-unsplash_n3txu6",
      },
    ],
  });
}
