-- Données initiales de base
INSERT INTO localization (country, continent) VALUES
                                                  ('France', 'Europe'),
                                                  ('Madagascar', 'Afrique'),
                                                  ('Brésil', 'Amérique du Sud');

INSERT INTO tree (name, description, price) VALUES
                                                ('Chêne', 'Arbre robuste pour climats tempérés', 15.50),
                                                ('Baobab', 'Arbre emblématique de Madagascar', 25.00),
                                                ('Eucalyptus', 'Croissance rapide, bon pour reforestation', 12.00),
                                                ('Palissandre', 'Bois précieux, espèce protégée', 45.00);

INSERT INTO project (localization_id, name, description) VALUES
                                                             (1, 'Reforestation Bretagne', 'Replantation après tempête'),
                                                             (2, 'Sauvegarde Baobabs', 'Protection des baobabs centenaires'),
                                                             (3, 'Forêt Amazonienne', 'Lutte contre déforestation');

INSERT INTO project_tree (project_id, tree_id) VALUES
-- Projet Reforestation Bretagne (France)
(1, 1), -- Chêne
(1, 3), -- Eucalyptus

-- Projet Sauvegarde Baobabs (Madagascar)
(2, 2), -- Baobab
(2, 4), -- Palissandre

-- Projet Forêt Amazonienne (Brésil)
(3, 3), -- Eucalyptus
(3, 4); -- Palissandre

-- Ajout de localisations en zones menacées
INSERT INTO localization (country, continent) VALUES
-- Zones critiques de déforestation
('Indonésie', 'Asie'),
('Myanmar', 'Asie'),
('Philippines', 'Asie'),

-- Amérique du Sud (déforestation Amazonie)
('Colombie', 'Amérique du Sud'),
('Pérou', 'Amérique du Sud'),
('Bolivie', 'Amérique du Sud'),

-- Amérique du Nord (zones post-incendies)
('Canada', 'Amérique du Nord'),
('États-Unis', 'Amérique du Nord'),

-- Australie (zones post-incendies)
('Australie', 'Australie'),

-- Europe (zones dégradées)
('Roumanie', 'Europe'),
('Portugal', 'Europe'),

-- Afrique (désertification)
('Sénégal', 'Afrique'),
('Mali', 'Afrique');

-- Arbres pour reforestation (espèces locales menacées)
INSERT INTO tree (name, description, price) VALUES
-- Asie (déforestation tropicale)
('Dipterocarpus', 'Géant de la forêt tropicale indonésienne', 45.00),
('Teck birman', 'Espèce native du Myanmar en danger', 38.00),
('Narra philippin', 'Arbre national des Philippines', 42.00),

-- Amérique du Sud (Amazonie)
('Acajou du Brésil', 'Bois précieux amazonien surexploité', 55.00),
('Cecropia', 'Arbre pionnier pour régénération rapide', 25.00),
('Pau-brasil', 'Arbre emblématique du Brésil', 48.00),

-- Amérique du Nord (forêt boréale)
('Épinette noire', 'Conifère boréal post-incendie', 28.00),
('Peuplier faux-tremble', 'Régénération après perturbations', 22.00),

-- Australie (bushland)
('Eucalyptus à gomme rouge', 'Résistant aux incendies', 35.00),
('Banksia géant', 'Endémique Australie-Occidentale', 32.00),

-- Europe (forêts dégradées)
('Chêne de Roumanie', 'Restauration forêts des Carpates', 30.00),
('Chêne-liège', 'Écosystème méditerranéen menacé', 40.00),

-- Afrique (Grande Muraille Verte)
('Balanites', 'Résistant sécheresse, fruits nutritifs', 20.00),
('Prosopis', 'Fixateur d''azote anti-désertification', 18.00);

-- Projets de reforestation urgents
INSERT INTO project (localization_id, name, description) VALUES
-- Asie - zones critiques (localization_id 4, 5, 6)
(4, 'Bornéo Emergency', 'Restauration urgente après huile de palme'),
(5, 'Myanmar Forest Rescue', 'Reboisement zones d''exploitation illégale'),
(6, 'Philippines Coral Triangle', 'Mangroves protection récifs coralliens'),

-- Amazonie - poumons de la Terre (localization_id 7, 8, 9)
(7, 'Amazonie Colombienne', 'Corridor biologique post-déforestation'),
(8, 'Andes-Amazonie Pérou', 'Transition montagne-forêt tropicale'),
(9, 'Bolivie Biodiversité', 'Hotspot mondial de biodiversité'),

-- Amérique du Nord - réchauffement (localization_id 10, 11)
(10, 'Forêt Boréale Canada', 'Adaptation changement climatique'),
(11, 'Californie Post-Feux', 'Régénération après méga-incendies'),

-- Australie - crise climatique (localization_id 12)
(12, 'Bushfire Recovery', 'Restauration écosystèmes post-incendies'),

-- Europe - dégradation (localization_id 13, 14)
(13, 'Carpates Sauvages', 'Dernière forêt primaire d''Europe'),
(14, 'Montado Portugais', 'Système agroforestier traditionnel'),

-- Afrique - Grande Muraille Verte (localization_id 15, 16)
(15, 'Sahel Vert Sénégal', 'Barrage anti-désertification'),
(16, 'Mali Reforestation', 'Corridor vert transsaharien');

-- Associations arbres/projets (espèces natives)
INSERT INTO project_tree (project_id, tree_id) VALUES
-- Bornéo Emergency (project_id 4)
(4, 5), -- Dipterocarpus (tree_id 5)
(4, 6), -- Teck birman (tree_id 6)

-- Myanmar Forest Rescue (project_id 5)
(5, 6), -- Teck birman (tree_id 6)
(5, 5), -- Dipterocarpus (tree_id 5)

-- Philippines Coral Triangle (project_id 6)
(6, 7), -- Narra philippin (tree_id 7)

-- Amazonie (project_id 7, 8, 9)
(7, 8), -- Acajou du Brésil (tree_id 8)
(7, 9), -- Cecropia (tree_id 9)
(8, 10), -- Pau-brasil (tree_id 10)
(8, 9),  -- Cecropia (tree_id 9)
(9, 8),  -- Acajou du Brésil (tree_id 8)
(9, 10), -- Pau-brasil (tree_id 10)

-- Amérique du Nord (project_id 10, 11)
(10, 11), -- Épinette noire (tree_id 11)
(10, 12), -- Peuplier faux-tremble (tree_id 12)
(11, 12), -- Peuplier faux-tremble (tree_id 12)
(11, 11), -- Épinette noire (tree_id 11)

-- Australie (project_id 12)
(12, 13), -- Eucalyptus à gomme rouge (tree_id 13)
(12, 14), -- Banksia géant (tree_id 14)

-- Europe (project_id 13, 14)
(13, 15), -- Chêne de Roumanie (tree_id 15)
(14, 16), -- Chêne-liège (tree_id 16)

-- Afrique - Grande Muraille Verte (project_id 15, 16)
(15, 17), -- Balanites (tree_id 17)
(16, 18); -- Prosopis (tree_id 18)

-- Utilisateurs
INSERT INTO "user" (first_name, last_name, email, password, role) VALUES
                                                                      ('Jean', 'Dupont', 'jean@email.com', 'hash123', 'client'),
                                                                      ('Marie', 'Martin', 'marie@email.com', 'hash456', 'client'),
                                                                      ('Admin', 'Site', 'admin@greenroots.com', 'adminHash', 'admin');

-- Commandes initiales
INSERT INTO "order" (user_id, status) VALUES
                                          (1, 'completed'), -- Jean commande
                                          (2, 'processing'); -- Marie commande

-- Lignes de commande initiales
INSERT INTO order_line (tree_id, order_id, quantity, price) VALUES
-- Jean commande 5 Chênes et 3 Eucalyptus
(1, 1, 5, 15.50), -- 5 Chênes
(3, 1, 3, 12.00), -- 3 Eucalyptus

-- Marie commande 2 Baobabs
(2, 2, 2, 25.00); -- 2 Baobabs

-- Nouvelles commandes pour les nouveaux projets
INSERT INTO "order" (user_id, status) VALUES
                                          (1, 'completed'),  -- Jean parraine Amazonie
                                          (2, 'completed'),  -- Marie parraine Bornéo
                                          (3, 'processing'); -- Admin teste Afrique

-- Nouvelles lignes de commande
INSERT INTO order_line (tree_id, order_id, quantity, price) VALUES
-- Jean parraine forêt amazonienne (order_id 3)
(8, 3, 10, 55.00),  -- 10 Acajous Amazonie
(9, 3, 20, 25.00),  -- 20 Cecropia régénération

-- Marie parraine Bornéo (order_id 4)
(5, 4, 5, 45.00),   -- 5 Dipterocarpus géants

-- Admin teste Grande Muraille Verte (order_id 5)
(17, 5, 25, 20.00), -- 25 Balanites Sahel
(18, 5, 15, 18.00); -- 15 Prosopis

-- Arbres plantés
INSERT INTO planted_tree (project_id, order_line_id) VALUES
-- Les 5 Chênes de Jean plantés en Bretagne
(1, 1),
-- Les 3 Eucalyptus de Jean plantés en Amazonie
(3, 2),
-- Les 2 Baobabs de Marie plantés à Madagascar
(2, 3),

-- Nouveaux plantés
-- Acajous de Jean plantés en Colombie
(7, 4),
-- Cecropia de Jean plantés en Colombie
(7, 5),
-- Dipterocarpus de Marie plantés à Bornéo
(4, 6),
-- Balanites d''Admin plantés au Sénégal
(15, 7),
-- Prosopis d''Admin plantés au Mali
(16, 8);

-- Transactions de paiement
INSERT INTO payment_transaction (order_id, amount, status, stripe_payment_id) VALUES
                                                                                  (1, 113.50, 'completed', 'pi_1234567890'),   -- Jean initial
                                                                                  (2, 50.00, 'completed', 'pi_0987654321'),    -- Marie initial
                                                                                  (3, 1050.00, 'completed', 'pi_amazon_rescue'),    -- Jean Amazonie: (10*55) + (20*25)
                                                                                  (4, 225.00, 'completed', 'pi_borneo_emergency'),  -- Marie Bornéo: 5*45
                                                                                  (5, 770.00, 'completed', 'pi_sahel_green');       -- Admin Sahel: (25*20) + (15*18)