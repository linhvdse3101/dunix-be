
// import {DunixBeApplication} from './application';
// import {UserRepository, ProductRepository, NotificationRepository, ChatRoomRepository, MessageRepository} from './repositories';
// import {User, Product, Notification} from './models';

// export async function seed(app: DunixBeApplication) {
//   const userRepo = await app.getRepository(UserRepository);
//   const prodRepo = await app.getRepository(ProductRepository);
//   const notiRepo = await app.getRepository(NotificationRepository);
//   const roomRepo = await app.getRepository(ChatRoomRepository);
//   const msgRepo = await app.getRepository(MessageRepository);

//   // Users
//   const buyerEmail = 'buyer@dunix.app';
//   const sellerEmail = 'seller@dunix.app';
//   const buyer = await userRepo.findOne({where: {email: buyerEmail}}) ?? await userRepo.create({
//     name: 'Buyer Test', role: 'buyer', verified: true, email: buyerEmail, phone: '0900000000'
//   } as User);
//   const seller = await userRepo.findOne({where: {email: sellerEmail}}) ?? await userRepo.create({
//     name: 'Seller Test', role: 'seller', verified: true, email: sellerEmail, phone: '0900000001'
//   } as User);

//   // Products
//   const count = await prodRepo.count();
//   if (!count.count) {
//     const data: Partial<Product>[] = [{"title": "iPhone 13 128GB", "price": 9000000, "images": ["https://picsum.photos/seed/p1/800/600",
//        "https://picsum.photos/seed/p1b/800/600"], "location": "TP.HCM", "description": "Máy đẹp, pin 89%", "sellerId": "u2"}, {"title": "MacBook Air M1 8/256", "price": 15000000, "images": ["https://picsum.photos/seed/p2/800/600"], "location": "Hà Nội",
//          "description": "Hàng cá nhân, còn hộp", "sellerId": "u2"}, {"title": "Xe Wave 2019", "price": 11000000, "images": ["https://picsum.photos/seed/p3/800/600"], "location": "Đà Nẵng",
//            "sellerId": "u2"}, {"title": "Tủ lạnh 200L", "price": 3200000, "images": ["https://picsum.photos/seed/p4/800/600"], "location": "TP.HCM",
//               "sellerId": "u2"},
//                {"title": "AirPods Pro 2", "price": 3800000, "images": ["https://picsum.photos/seed/p5/800/600"], "location": "Hà Nội", 
//                 "sellerId": "u2"}, {"title": "Ghế công thái học", "price": 2500000, "images": ["https://picsum.photos/seed/p6/800/600"], "location": "Cần Thơ",
//                    "sellerId": "u2"}, {"title": "Bàn phím cơ", "price": 1200000, "images": ["https://picsum.photos/seed/p7/800/600"], "location": "Hải Phòng", 
//                      "sellerId": "u2"}, {"title": "Màn hình 27\\\" 2K", "price": 3200000, "images": ["https://picsum.photos/seed/p8/800/600"], "location": "TP.HCM",
//                        "sellerId": "u2"}, {"title": "Máy ảnh Canon", "price": 6800000, "images": ["https://picsum.photos/seed/p9/800/600"], "location": "Huế", 
//                          "sellerId": "u2"}, {"title": "Đàn guitar", "price": 900000, "images": ["https://picsum.photos/seed/p10/800/600"], "location": "TP.HCM", 
//                            "sellerId": "u2"}];
//     for (const p of data) { await prodRepo.create(p as Product); }
//   }

//   // Notifications
//   const notiCount = await notiRepo.count();
//   if (!notiCount.count) {
//     await notiRepo.create({title:'Chào mừng', body: 'Chúc bạn mua bán an toàn với SafeTrade!', createdAt: new Date().toISOString()} as Notification);
//     await notiRepo.create({title:'Khuyến mãi', body: 'Giảm 20% phí đẩy tin trong tuần này', createdAt: new Date().toISOString()} as Notification);
//   }

//   // Chat rooms and messages
//   const rcount = await roomRepo.count();
//   if (!rcount.count) {
//     const r1 = await roomRepo.create({title: 'Người bán A', unread: 2, updatedAt: new Date().toISOString()});
//     const r2 = await roomRepo.create({title: 'Người bán B', unread: 0, updatedAt: new Date().toISOString()});
//     await msgRepo.create({roomId: r1.id!, text: 'Chào bạn'});
//     await msgRepo.create({roomId: r1.id!, text: 'Ok bạn nhé'});
//     await msgRepo.create({roomId: r2.id!, text: 'Ship được không?'});
//   }
// }
