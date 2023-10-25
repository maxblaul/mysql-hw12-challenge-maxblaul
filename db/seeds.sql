INSERT INTO department (name) VALUES
('Marketing'),
('Logistics'),
('Finance'),
('Design'),
('HR');

INSERT INTO role (title, salary, department_id) VALUES
('Marketing guy', 50000.00, 1),
('Logistics guy', 60000.00, 2),
('Finance guy', 80000.00, 3),
('Design guy', 70000.00, 1),
('HR guy', 80000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Darth', 'Vader', 1, NULL),
('Luke', 'Skywalker', 2, 1),
('Ben', 'Kenobi', 3, 1),
('Jabba', 'Hut', 3, 1),
('Han', 'Solo', 4, 2);