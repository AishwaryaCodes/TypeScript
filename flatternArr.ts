// Given - List of Users - each user has multiple post
// TOdo - Flatten nested data - flattening


class Post {
  id: number;
  likes?: number;

  constructor(id: number, likes?: number) {
    this.id = id;
    this.likes = likes;
  }
}

class User {
  user: string;
  posts: Post[];

  constructor(user: string, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }
}

// Output format
class FlattenedPost {
  user: string;
  postId: number;
  likes?: number;

  constructor(user: string, postId: number, likes?: number) {
    this.user = user;
    this.postId = postId;
    this.likes = likes;
  }
}

class PostFlattener {

  static flattenUserPosts(users: User[]): FlattenedPost[] {
    const result: FlattenedPost[] = []; // result arr

    for(const user of users) { // for each user
      for(const post of user.posts) { // for each post
        result.push(
          new FlattenedPost( // create new flattened object 
            user.user,
            post.id
          )
        )
      }
    }
    return result;
  }
   

  static flattenUserPostsWithLikes(users: User[]): FlattenedPost[] {
    const res: FlattenedPost[] = []; // result arr

    for(const user of users) {
      for(const post of user.posts) {
        res.push(
          new FlattenedPost (
            user.user,
            post.id,
            post.likes
          )
        )
      }
    }
    return res;
  }


}


const users1: User[] = [
  new User("A", [new Post(1), new Post(2)]),
  new User("B", [new Post(3)])
];

console.log("Follow-up 1");
console.log(PostFlattener.flattenUserPosts(users1));