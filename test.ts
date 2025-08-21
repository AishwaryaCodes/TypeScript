// You’re designing a fraud detection system for a payment gateway. Each payment transaction has a user ID. To detect suspicious behavior, the system should find the smallest //window that contains all distinct users who participated in the day’s transactions. 
//Return the start 
// and end index of that window.If multiple such windows exist, return the first one.
// result : [0,2]
// fraud detection system

// [1,2,3,5, 6, 5, 2 ] []

// Distint user  - using SET [1,2,3,5,6] 

// left - 0 , right = arr.len - 1


// input : [1, 2, 2, 3, 1] , k = 2
// Distinct users : 1,2,3
// Smallest window : [0,3] , smallest window with 2 unique users

// smallest window : [0,1] {1,2}, 2 unique users
// [2,3] {2,3} , [3,4] -> {3,1}

// input : [4,2,2,1,2,3,4]  -> [4,2,2,1,5,3,4,2] = [2,6]
// Distinct users: 1,2 
// smallest window: [3,6]

function smallWindow(users: number[]): [number, number] {
  const unique = new Set(users);
  const req = unique.size;

  let count: Record<number, number> = {};

  let bestStart = -1;
  let bestEnd = -1;
  let minLen = Infinity;

  let l  = 0;

  let formed = 0;

  for(let r = 0; r < users.length; r++) {
    const u = u[r];

    count[u] = (count[u] || 0) + 1;

    if(count[u] === 1) {
      formed++;
    }

    while(formed === req) {
      if(r - l + 1 < minLen) {
        minLen = r - l + 1;
        bestStart = l;
        bestEnd = r;
      }

      const luser = u[l];
      count[luser]--;

      if(count[luser] === 0) {
        formed--;
      }

      l++;        
    }
  }


return [bestStart, bestEnd];

}