function solution(today, terms, privacies) {
    //다른 사람의 풀이를 보며 배운 점
    //참고한 코드 작성자 : hyunmo0417, gbwlxhd97
    var answer = [];

    var newTerms = new Map();
    for (var idx = 0; idx < terms.length; idx++) {
        var splitedTerms = terms[idx].split(' ');
        var type = splitedTerms[0]; //예. A
        var months = Number(splitedTerms[1]); //예. 6
        newTerms.set(type, months);
    }


    for (var idx = 0; idx < privacies.length; idx++) {
        var push = false;

        var splitedPrivacies = privacies[idx].split(' ');
        var collectedDate = splitedPrivacies[0];
        var type = splitedPrivacies[1];

        //1. 한 줄로 더 간단하게 표현할 수 있음
        var splitedCollectedDate = collectedDate.split('.');
        var year = Number(splitedCollectedDate[0]);
        var month = Number(splitedCollectedDate[1]);
        var date = Number(splitedCollectedDate[2]);
        // >> var [year, month, date] = today.split(".").map(Number);

        //2. 굳이 연, 월, 일로 나타내는 '날짜'로 비교 X, '총 일 수'로만 간단하게 계산
        month = month + newTerms.get(type);
        if (month > 12) {
            if (month % 12 == 0) {
                year = year + Math.floor(month / 12) - 1;
                month = 12;
            } else {
                year = year + Math.floor(month / 12);
                month = month % 12;
            }
        }

        var splitedToday = today.split('.');
        var todayYear = Number(splitedToday[0]);
        var todayMonth = Number(splitedToday[1]);
        var todayDate = Number(splitedToday[2]);

        var newToday = new Date(`${todayYear}-${todayMonth}-${todayDate}`);
        var expiration = new Date(`${year}-${month}-${date}`);
        // >>  var todates = year * 12 * 28 + month * 28 + date;
        //     var dates = day[0] * 12 * 28 + day[1] * 28 + day[2] + t[term] * 28;
        //     if (dates <= todates) answer.push(i + 1);

        if (newToday >= expiration) {
            answer.push(idx + 1);
        }
    }

    return answer;
}

//참고한 답안 링크
//https://school.programmers.co.kr/learn/courses/30/lessons/150370/solution_groups?language=javascript