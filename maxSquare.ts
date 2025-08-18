// Find the Max Square in matrix

function maxSquare(matrix: string[][]): number{

    let n = matrix.length; // num of rows
    let m = matrix[0].length; // num of cols

    const dp = new Array<number>(m + 1).fill(0); // created a DP array
                                                // len is m + 1  = to avoid out-of bound checks


    let maxSide = 0; // keep track of large square's side length

    for(let i = 1; i <= n; i++) {

        let prevDiag = 0; // dp[i - 1][j - 1] 


        for(let j = 1; j <= m; j ++) {

            const temp = dp[j];

            if(matrix[i - 1][j - 1] === '1') {

                dp[j] = 1 + Math.min(dp[j], dp[j - 1], prevDiag);

                maxSide = Math.max(maxSide, dp[j]);
            }

            else {
                dp[j] = 0;
            }

            prevDiag = temp;


        }

    }

    return maxSide * maxSide;

};