import { QueryTypes } from "sequelize";

const up = async ({ context }) => {
  await context.sequelize.query(`
    CREATE OR REPLACE FUNCTION kill_sessions_on_disable() RETURNS trigger AS $$
    BEGIN
      IF NEW.disabled = TRUE AND OLD.disabled = FALSE THEN
        DELETE FROM sessions WHERE user_id = NEW.id;
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await context.sequelize.query(`
    CREATE TRIGGER user_disable_sessions
    AFTER UPDATE ON users
    FOR EACH ROW
    WHEN (NEW.disabled IS TRUE AND OLD.disabled IS FALSE)
    EXECUTE FUNCTION kill_sessions_on_disable();
  `);
};

const down = async ({ context }) => {
  await context.sequelize.query(`
    DROP TRIGGER IF EXISTS user_disable_sessions ON users;
  `);
  await context.sequelize.query(`
    DROP FUNCTION IF EXISTS kill_sessions_on_disable();
  `);
};

export { up, down };
