import { Blog } from "./blog.js";
import { User } from "./user.js";
import { ReadingList } from "./readinglist.js";
import { Membership } from "./membership.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(ReadingList, { foreignKey: "user_id" });
ReadingList.belongsTo(User, { foreignKey: "user_id" });

Blog.belongsToMany(ReadingList, {
  through: { model: Membership },
  foreignKey: "blog_id",
  otherKey: "reading_list_id",
});
ReadingList.belongsToMany(Blog, {
  through: { model: Membership },
  foreignKey: "reading_list_id",
  otherKey: "blog_id",
});

Membership.belongsTo(Blog, { foreignKey: "blog_id" });
Membership.belongsTo(ReadingList, { foreignKey: "reading_list_id" });
Blog.hasMany(Membership, { foreignKey: "blog_id" });
ReadingList.hasMany(Membership, { foreignKey: "reading_list_id" });

export { Blog, User, Membership, ReadingList };