insert into address (country, city, street) values ('Serbia', 'Novi Sad', 'Jevrejska 2');
insert into address (country, city, street) values ('Serbia', 'Novi Sad', 'Kosovska 1');
insert into address (country, city, street) values ('Montenegro', 'Herceg Novi', 'Jadranska 21');
insert into address (country, city, street) values ('Montenegro', 'Herceg Novi', 'Jadranska 11');
insert into address (country, city, street) values ('Montenegro', 'Herceg Novi', 'Jadranska 52');
insert into address (country, city, street) values ('Serbia', 'Novi Sad', 'Futoska 1');
insert into address (country, city, street) values ('Serbia', 'Belgrade', 'Kneza Milosa 19a');
insert into address (country, city, street) values ('Serbia', 'Zrenjanin', 'VUka Karadzica 11');
insert into address (country, city, street) values ('Serbia', 'Sabac', 'Nikole Pasica 21');
insert into address (country, city, street) values ('Serbia', 'Loznica', 'Vuka Karadzica 62');
insert into address (country, city, street) values ('Serbia', 'Novi Sad', 'Vuka Karadzica 2');
insert into address (country, city, street) values ('Serbia', 'Beograd', 'Nikole Tesle 22');
insert into address (country, city, street) values ('Serbia', 'Novi Sad', 'Dunavska 59');



insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (8.8, 10);
insert into rating (average, num_of_votes) values (7.7, 5);
insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (0, 0);
insert into rating (average, num_of_votes) values (9, 2);
insert into rating (average, num_of_votes) values (6.5, 5);
insert into rating (average, num_of_votes) values (9.2, 4);


insert into role (name) values ('ROLE_BOAT_OWNER');
insert into role (name) values ('ROLE_COTTAGE_OWNER');
insert into role (name) values ('ROLE_INSTRUCTOR');
insert into role (name) values ('ROLE_CLIENT');
insert into role (name) values ('ROLE_ADMIN');
insert into role (name) values ('ROLE_SUPER_ADMIN');

insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);
insert into loyalty_program (points, rank) values (0, 0);

-- Lozinke su hesovane pomocu BCrypt algoritma https://www.dailycred.com/article/bcrypt-calculator
-- Lozinka za sve user-e je 123

insert into users (
   is_deleted, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, address_id, rating_id)
   VALUES (false, 'misa@gmail.com', true, 'Misa', 'Misic', '2021-10-01 18:57:58.508-07', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', '0662322321', 1, 1);
insert into user_role (user_id, role_id) values (1, 1);
insert into service_provider (id, loyalty_id) values (1, 1);
insert into property_owner (id) values (1);
insert into boat_owner (id) values (1);


insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
    values (40, 5, false, 'Prostran brod za porodicu. Moze se koristiti i za brze plovidbe. Takodje pogodan je nocenje.', 'Gliser', 'Nema pusenja.', 3, 5, 1, 50);
insert into property (id) values (1);
insert into boat (engine_num, engine_pow, length, max_speed, type, id)
    values ('241241', 150, 9, 60, 1, 1);
insert into additional_service (description, price, title, offer_id) values ('Voli da vozi velike brodove. Iskustvo 5 godina.', 0, 'Unajmljivanje vozaca', 1);
insert into additional_service (description, price, title, offer_id) values ('Domet: 1500m', 12, 'Rezervacija dvogleda', 1);
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (1, 'stap');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (1, 'mamac');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (1, 'masinica');
insert into boat_nav_equipment (boat_id, nav_equipment) values (1, 'gps');
insert into offer_images (offer_id, images) values (1, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929534/upload/sani_jqaufi.jpg');
insert into offer_images (offer_id, images) values (1, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929534/upload/bayliner3_rsz_pnbepp.jpg');
insert into offer_images (offer_id, images) values (1, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929534/upload/bayliner1_rsz_uj1oqr.jpg');
insert into offer_images (offer_id, images) values (1, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929534/upload/bayliner4_rsz_tixslh.jpg');







insert into users (
    is_deleted, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, address_id, rating_id)
    VALUES (false, 'djura@gmail.com', true, 'Djura', 'Djuric', '2021-10-11 18:57:58.508-07', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', '0612522125', 2, 2);
insert into user_role (user_id, role_id) values (2, 2);
insert into service_provider (id, loyalty_id) values (2, 2);
insert into property_owner (id) values (2);
insert into cottage_owner (id) values (2);

insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
    values (40, 3, false, 'Udoban smestaj za dve ili vise osoba. Poseduje divan pogled sa terase.', 'Cozy Cottage', 'Nema pusenja. Zabranjene su zurke i afteri.', 4, 6, 2, 90);
insert into property (id) values (2);
insert into cottage (id, num_of_rooms) values (2, 2);
insert into additional_service (description, price, title, offer_id) values ('Stara je 3 godine. Postoji daljinski za ukljucivanje.', 2, 'Upotreba klime uredjaja', 2);
insert into additional_service (description, price, title, offer_id) values ('Star je 2 godine.', 15, 'Upotreba mini-frizidera', 2);
insert into offer_images (offer_id, images) values (2, 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1');
insert into offer_images (offer_id, images) values (2, 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1');
insert into offer_images (offer_id, images) values (2, 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1');
insert into offer_images (offer_id, images) values (2, 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1');

insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (50, 5, false, 'Cista, mala vikendica. Namenjena je za manji broj ljudi.', 'Cool Cottage', 'No regulations', 11, 11, 2, 90);
insert into property (id) values (3);
insert into cottage (id, num_of_rooms) values (3, 3);
insert into additional_service (description, price, title, offer_id) values ('Stara je 3 godine. Postoji daljinski za ukljucivanje.', 10, 'Upotreba klime uredjaja', 3);
insert into additional_service (description, price, title, offer_id) values ('Star je 3 godine.', 15, 'Upotreba mini-frizidera', 3);
insert into offer_images (offer_id, images) values (3, 'https://res.cloudinary.com/bookerapp/image/upload/v1653823038/upload/udqs0yyg526owhvec7c7.webp');
insert into offer_images (offer_id, images) values (3, 'https://res.cloudinary.com/bookerapp/image/upload/v1653823038/upload/nmxqc40qef08gjmfpj83.webp');
insert into offer_images (offer_id, images) values (3, 'https://res.cloudinary.com/bookerapp/image/upload/v1653823038/upload/al93g5pqb0sjclqktvsn.webp');
insert into offer_images (offer_id, images) values (3, 'https://res.cloudinary.com/bookerapp/image/upload/v1653823038/upload/vqyxovcjdodvaz6hjplg.webp');

insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (50, 5, false, 'Brvnara u Knez Mihajlovoj 4', 'Wooden Cottage', 'No regulations', 12, 12, 2, 76);
insert into property (id) values (4);
insert into cottage (id, num_of_rooms) values (4, 2);
insert into additional_service (description, price, title, offer_id) values ('Koristiti samo u jednoj prostoriji. Moze dosta da zagreje.', 0, 'Upotreba grejalice', 4);
insert into additional_service (description, price, title, offer_id) values ('Moze stati 25-30 pica.', 15, 'Upotreba frizidera', 4);
insert into offer_images (offer_id, images) values (4, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780050/upload/q9aoizc8aoa0otemhupl.webp');
insert into offer_images (offer_id, images) values (4, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780050/upload/iokfie8ojypk7pnb2rea.webp');
insert into offer_images (offer_id, images) values (4, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780050/upload/mupd6jescw6zdltsqbd4.webp');
insert into offer_images (offer_id, images) values (4, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780051/upload/qzctnbn3owzrawm1qfbd.webp');

insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (50, 5, false, 'Ruralna vikendica u Batajnici.', 'Prefabricated Cottage', 'Nema pusenja. Duvanski dim steti ljdima u Vasoj okolini.', 13, 13, 2, 95);
insert into property (id) values (5);
insert into cottage (id, num_of_rooms) values (5, 2);
insert into additional_service (description, price, title, offer_id) values ('Hladi do 16 stepeni Celzijusa.', 0, 'Upotreba klime uredjaja', 5);
insert into additional_service (description, price, title, offer_id) values ('Kapacitet: 15 pica', 15, 'Upotreba mini-frizidera', 5);
insert into offer_images (offer_id, images) values (5, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780232/upload/olerxyei1nh0cgyyzhnw.webp');
insert into offer_images (offer_id, images) values (5, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780024/upload/clrbiphmmfpsgbt0kdug.webp');
insert into offer_images (offer_id, images) values (5, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780023/upload/y18ebutbtdvmxvoblpwk.webp');
insert into offer_images (offer_id, images) values (5, 'https://res.cloudinary.com/bookerapp/image/upload/v1653780023/upload/cqflt2cx8s55n2p5ekru.webp');


insert into users (
    is_deleted, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, address_id, rating_id)
    VALUES (false, 'pera@gmail.com', true, 'Pera', 'Peric', '2021-12-11 18:57:58.508-07', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', '0656222126', 6, 3);
insert into user_role (user_id, role_id) values (3, 3);
insert into service_provider (id, loyalty_id) values (3, 3);
insert into fishing_instructor (biography, id) values ('Short biography', 3);

insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
    values (80, 2, false, 'Pecanje na podrucju gde se nalazi iskljucivo bela riba i melezi.', 'White fish fishing', '18+', 5, 7, 3, 100);
insert into fishing_lesson (id) values (6);
insert into additional_service (description, price, title, offer_id) values ('Roni se do dubine od 5m.', 50, 'Ronjenje', 6);
insert into additional_service (description, price, title, offer_id) values ('Ovde mozete videti kako iskusni pecarosi love somove.', 29, 'Posmatranje lova na somove', 6);
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (6, ' stap');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (6, ' mamac');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (6, ' masinica');
insert into offer_images (offer_id, images) values (6, 'http://res.cloudinary.com/bookerapp/image/upload/v1654207558/upload/hatycpo2fbzvyjwrhyrn.jpg');
insert into offer_images (offer_id, images) values (6, 'http://res.cloudinary.com/bookerapp/image/upload/v1654207558/upload/gaffi6jy3sxkkcis8low.jpg');
insert into offer_images (offer_id, images) values (6, 'http://res.cloudinary.com/bookerapp/image/upload/v1654207559/upload/yhnsffkpf9hjzomol0vx.jpg');


insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (80, 2, false, 'Pecanje somova. Dajemo klijentima sansu da se oprobaju u ovom izazovu.', 'Catfish fishing', '23+', 7, 7, 3, 100);
insert into fishing_lesson (id) values (7);
insert into additional_service (description, price, title, offer_id) values ('Imate mogucnost da tog dana posetite delfine i nahranite ih!', 5, 'Hranjenje delfina na Dunavu', 7);
insert into additional_service (description, price, title, offer_id) values ('Ovo se izvodi samo uz nadzor instruktora. 23+.', 29, 'Plivanje sa delfinima', 7);
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (7, ' stap');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (7, ' mamac');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (7, ' masinica');
insert into offer_images (offer_id, images) values (7, 'http://res.cloudinary.com/bookerapp/image/upload/v1654207212/upload/ligzj6z6r8zgu0pvartj.jpg');
insert into offer_images (offer_id, images) values (7, 'http://res.cloudinary.com/bookerapp/image/upload/v1654207212/upload/moc6hektueywjn7ewmgn.jpg');
insert into offer_images (offer_id, images) values (7, 'http://res.cloudinary.com/bookerapp/image/upload/v1654207213/upload/obdgznczhsoq64tjb4ip.jpg');



insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (90, 3, false, 'Pecanje stuke. Dajemo klijentima sansu da se oprobaju u ovom izazovu. Pecanje stuke moze biti jako zanimljivo.', 'Stuka fishing', '23+', 4, 7, 3, 100);
insert into fishing_lesson (id) values (8);
insert into additional_service (description, price, title, offer_id) values ('Imate mogucnost da tog dana posetite stuke i nahranite ih!', 5, 'Hranjenje stuka na Dunavu', 8);
insert into additional_service (description, price, title, offer_id) values ('Ovo se izvodi samo uz nadzor instruktora. 23+.', 29, 'Plivanje sa delfinima', 8);
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (8, ' tanak stap sa zicom');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (8, ' mreza za pecanje');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (8, ' brza masinica');
insert into offer_images (offer_id, images) values (8, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929198/upload/kapitalna-stuka-pecanje-u-jesen_skhppt.jpg');
insert into offer_images (offer_id, images) values (8, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929197/upload/images_1_gl53ba.jpg');
insert into offer_images (offer_id, images) values (8, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929197/upload/featured-32_dyowpm.jpg');
insert into offer_images (offer_id, images) values (8, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929234/upload/Ultimativni-vodi%C4%8D-za-pecanje-%C5%A1tuke-1024x693-1_srihav.jpg');


insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (85, 4, false, 'Pecanje tolstolobika. Tolstolobik je jedna od najvecih riba na ovim prostorima', 'Silver carp fishing', '23+', 1, 7, 3, 130);
insert into fishing_lesson (id) values (9);
insert into additional_service (description, price, title, offer_id) values ('Imate mogucnost da tog dana posetite tolstolobika i nahranite ih!', 5, 'Hranjenje tolstolobika na Dunavu', 9);
insert into additional_service (description, price, title, offer_id) values ('Ovo se izvodi samo uz nadzor instruktora. 23+.', 29, 'Plivanje sa delfinima', 9);
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (9, ' mreza za pecanje');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (9, ' mamac');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (9, ' masinica');
insert into offer_images (offer_id, images) values (9, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929000/upload/213_yixxzm.jpg');
insert into offer_images (offer_id, images) values (9, 'https://res.cloudinary.com/bookerapp/image/upload/v1655928949/upload/ulov_win2kh.jpg');
insert into offer_images (offer_id, images) values (9, 'https://res.cloudinary.com/bookerapp/image/upload/v1655928926/upload/riba1_q3rzue.jpg');


insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (75, 3, false, 'Pecanje i voznja camcem. Ne trazimo prethodno iskustvo sa voznjom.', 'Fishing and boat riding', '20+', 5, 7, 3, 120);
insert into fishing_lesson (id) values (10);
insert into additional_service (description, price, title, offer_id) values ('Imate mogucnost driftujete samo pod nadzorom instruktora.', 5, 'Driftovanje po vodi', 10);
insert into additional_service (description, price, title, offer_id) values ('Ovo se izvodi samo uz nadzor instruktora. 20+.', 29, 'Plivanje sa delfinima', 10);
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (10, ' mreza za pecanje');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (10, ' veslo');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (10, ' masinica');
insert into offer_images (offer_id, images) values (10, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929000/upload/213_yixxzm.jpg');
insert into offer_images (offer_id, images) values (10, 'https://res.cloudinary.com/bookerapp/image/upload/v1655928949/upload/ulov_win2kh.jpg');
insert into offer_images (offer_id, images) values (10, 'https://res.cloudinary.com/bookerapp/image/upload/v1655928926/upload/riba1_q3rzue.jpg');


insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (90, 3, false, 'Pecanje i jedrenje. Ne trazimo prethodno iskustvo sa jedrenjem.', 'Fishing and sailing', '21+', 4, 7, 3, 110);
insert into fishing_lesson (id) values (11);
insert into additional_service (description, price, title, offer_id) values ('Zahteva obuku od 3 sata i polaganje testa.', 3, 'Samostalno jedrenje', 11);
insert into additional_service (description, price, title, offer_id) values ('Ovo se izvodi samo uz nadzor instruktora. 20+.', 29, 'Plivanje sa delfinima', 11);
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (11, ' mreza za pecanje');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (11, ' veslo');
insert into fishing_lesson_fishing_equipment (fishing_lesson_id, fishing_equipment) values (11, ' dupla masinica');
insert into offer_images (offer_id, images) values (11, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929000/upload/213_yixxzm.jpg');
insert into offer_images (offer_id, images) values (11, 'https://res.cloudinary.com/bookerapp/image/upload/v1655928949/upload/ulov_win2kh.jpg');
insert into offer_images (offer_id, images) values (11, 'https://res.cloudinary.com/bookerapp/image/upload/v1655928926/upload/riba1_q3rzue.jpg');



insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (40, 5, false, 'Prostran brod za porodicu. Moze se koristiti i za spore plovidbe. Takodje pogodan je nocenje.', 'Drveni brod', 'Nema pusenja. Nema skakanja po brodu.', 3, 5, 1, 60);
insert into property (id) values (12);
insert into boat (engine_num, engine_pow, length, max_speed, type, id)
values ('231201', 120, 9, 60, 1, 12);
insert into additional_service (description, price, title, offer_id) values ('Voli da vozi velike brodove. Iskustvo 10 godina.', 20, 'Unajmljivanje vozaca', 12);
insert into additional_service (description, price, title, offer_id) values ('Domet: 1700m', 20, 'Rezervacija dvogleda', 12);
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (12, 'mreza za pecanje');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (12, 'mamac');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (12, 'masinica');
insert into boat_nav_equipment (boat_id, nav_equipment) values (12, 'gps');
insert into offer_images (offer_id, images) values (12, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929734/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-02_q2ohwp.jpg');
insert into offer_images (offer_id, images) values (12, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929735/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-05_fl2mup.jpg');
insert into offer_images (offer_id, images) values (12, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929734/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-04-346x247_ch9ztg.jpg');
insert into offer_images (offer_id, images) values (12, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929734/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-07_wxctgc.jpg');


insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (45, 5, false, 'Novija verzija cuvenog norveskog Drakara. Restilizovan je i dosta vise kosta.', 'Drakar', 'Nema pusenja. Nema skakanja po brodu.', 7, 5, 1, 70);
insert into property (id) values (13);
insert into boat (engine_num, engine_pow, length, max_speed, type, id)
values ('231243', 120, 9, 60, 1, 13);
insert into additional_service (description, price, title, offer_id) values ('Voli da vozi velike brodove. Iskustvo 8 godina.', 20, 'Unajmljivanje vozaca', 13);
insert into additional_service (description, price, title, offer_id) values ('Domet: 1800m', 25, 'Rezervacija dvogleda', 13);
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (13, 'mreza za pecanje');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (13, 'veslo');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (13, 'masinica');
insert into boat_nav_equipment (boat_id, nav_equipment) values (13, 'gps');
insert into offer_images (offer_id, images) values (13, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929733/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-03_grs1vt.jpg');
insert into offer_images (offer_id, images) values (13, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929735/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-05_fl2mup.jpg');
insert into offer_images (offer_id, images) values (13, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929734/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-04-346x247_ch9ztg.jpg');
insert into offer_images (offer_id, images) values (13, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929734/upload/Belgrade-Boat-Rental-Drveni-Norveski-gliser-07_wxctgc.jpg');





insert into offer (cancellation_fee, capacity, deleted, description, name, regulations, address_id, rating_id, offer_owner_id, price)
values (50, 5, false, 'Novija verzija cuvenog Kajaka. Restilizovan je i dosta vise kosta.', 'Kajak', 'Nema pusenja. Nema skakanja po brodu.', 6, 5, 1, 60);
insert into property (id) values (14);
insert into boat (engine_num, engine_pow, length, max_speed, type, id)
values ('931541', 120, 9, 60, 1, 14);
insert into additional_service (description, price, title, offer_id) values ('Voli da vozi velike brodove. Iskustvo 9 godina.', 30, 'Unajmljivanje vozaca', 14);
insert into additional_service (description, price, title, offer_id) values ('Domet: 1850m', 35, 'Rezervacija dvogleda', 14);
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (14, 'mreza za pecanje');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (14, 'veslo');
insert into boat_fishing_equipment (boat_id, fishing_equipment) values (14, 'dupla masinica');
insert into boat_nav_equipment (boat_id, nav_equipment) values (14, 'gps');
insert into offer_images (offer_id, images) values (14, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929835/upload/0N1A3887-700x450_frvwkc.jpg');
insert into offer_images (offer_id, images) values (14, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929833/upload/0N1A3945-700x500_tyhu4y.jpg');
insert into offer_images (offer_id, images) values (14, 'https://res.cloudinary.com/bookerapp/image/upload/v1655929833/upload/0N1A4180-700x500_v4roem.jpg');



insert into users (
    is_deleted, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, address_id, rating_id)
    VALUES (false, 'admin@gmail.com', true, 'Admin', 'Adminic', '2021-12-10 18:57:58.508-07', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', '0632333236', 7, 4);
insert into administrator (id, password_changed) values (4, true);
insert into super_admin (id) values (4);
insert into user_role (user_id, role_id) values (4, 6);



insert into users (
    is_deleted, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, address_id, rating_id)
VALUES (false, 'obicanadmin@gmail.com', true, 'Admin', 'Adminic', '2021-12-10 18:57:58.508-07', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', '0632333236', 7, 4);
insert into administrator (id, password_changed) values (5, true);
insert into user_role (user_id, role_id) values (5, 5);


insert into users (
    is_deleted, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, address_id, rating_id)
VALUES (false, 'mrsisa2022@gmail.com', true, 'Milenko', 'Savic', '2021-12-10 18:57:58.508-07', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', '0632313236', 7, 4);
insert into client (id, num_of_penalties, loyalty_id) values (6, 0, 1);
insert into user_role (user_id, role_id) values (6, 4);
insert into offer_subscribed_clients (offer_id, client_id) values (2, 6);


insert into users (
    is_deleted, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, address_id, rating_id)
VALUES (false, 'klijent2@gmail.com', true, 'Isidor', 'Stefanovski', '2021-12-10 18:57:58.508-07', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', '0612313236', 7, 4);
insert into client (id, num_of_penalties, loyalty_id) values (7, 0, 2);
insert into user_role (user_id, role_id) values (7, 4);


insert into period (
    date_from, date_to, offer_id)
VALUES ('2022-05-21', '2022-05-26', 2);

insert into reservation (
    has_client_rated, has_owner_rated, num_of_attendants, price, period_id, client_id, offer_id)
VALUES (false, false, 2, 304, 1, 6, 2);

insert into period (
    date_from, date_to, offer_id)
VALUES ('2022-06-12', '2022-06-22', 2);

insert into reservation (
    has_client_rated, has_owner_rated, num_of_attendants, price, period_id, client_id, offer_id)
VALUES (false, false, 4, 740, 2, 6, 2);

insert into period (
    date_from, date_to, offer_id)
VALUES ('2022-06-27', '2022-06-30', 2);

insert into reservation (
    has_client_rated, has_owner_rated, num_of_attendants, price, period_id, client_id, offer_id)
VALUES (false, false, 4, 222, 3, 6, 2);


insert into reservation (
    has_client_rated, has_owner_rated, num_of_attendants, price, period_id, client_id, offer_id)
VALUES (false, false, 4, 300, 3, 6, 6);

insert into reservation (
    has_client_rated, has_owner_rated, num_of_attendants, price, period_id, client_id, offer_id)
VALUES (false, false, 4, 200, 2, 6, 6);

insert into reservation (
    has_client_rated, has_owner_rated, num_of_attendants, price, period_id, client_id, offer_id)
VALUES (false, false, 4, 250, 1, 6, 6);

insert into profit_percentage (id, profit_percentage_value) values (1, 0.3);    --postojace samo jedan profit_percentage u sistemu koji se menja i vazi za sve rezervacije
