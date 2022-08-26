INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Service');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', '75000', 1),
  ('Salesperson', '50000', 1),
  ('Lead Engineer', '160000', 2),
  ('Acconut Manager', '90000', 3),
  ('Accountant', '60000', 3),
  ('Legal Team Lead', '150000', 4),
  ('Lawyer', '120000', 1),
  ('Customer Service', '50000', 5);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 2, NULL),
  ('Jack', 'London', 1, NULL),
  ('Robert', 'Bruce', 4, 2),
  ('Peter', 'Greenaway', 2, 2),
  ('Derek', 'Jarman', 3, 3),
  ('Paolo', 'Pasolini', 6, 3),
  ('Heathcote', 'Williams', 8, 4),
  ('Sandy', 'Powell', 7, 3),
  ('Emil', 'Zola', 5, 2),
  ('Sissy', 'Coalpits', 4, 4),
  ('Antoinette', 'Capet', 7, NULL),
  ('Samuel', 'Delany', 4,2);