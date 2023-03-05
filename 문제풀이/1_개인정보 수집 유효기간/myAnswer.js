function solution(today, terms, privacies) {
    var answer = [];

    //1. terms을 Map으로 만들기 (타입 : 개월 수)
    var newTerms = new Map();
    for (var idx = 0; idx < terms.length; idx++) {
        var splitedTerms = terms[idx].split(' ');
        var type = splitedTerms[0]; //예. A
        var months = Number(splitedTerms[1]); //예. 6
        newTerms.set(type, months);
    }

    //2. 유효기간 날짜 구하기
    for (var idx = 0; idx < privacies.length; idx++) {
        var push = false;

        var splitedPrivacies = privacies[idx].split(' ');
        var collectedDate = splitedPrivacies[0];
        var type = splitedPrivacies[1];

        var splitedCollectedDate = collectedDate.split('.');
        var year = Number(splitedCollectedDate[0]); //수집된 날짜 year
        var month = Number(splitedCollectedDate[1]); //수집된 날짜 month
        var date = Number(splitedCollectedDate[2]); //수집된 날짜 date

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

        //3. 유효기간과 오늘 날짜 비교
        var splitedToday = today.split('.');
        var todayYear = Number(splitedToday[0]);
        var todayMonth = Number(splitedToday[1]);
        var todayDate = Number(splitedToday[2]);

        var newToday = new Date(`${todayYear}-${todayMonth}-${todayDate}`);
        var expiration = new Date(`${year}-${month}-${date}`);

        if (newToday >= expiration) {
            answer.push(idx + 1);
        }
    }

    return answer;
}

//문제 링크
//https://school.programmers.co.kr/learn/courses/30/lessons/150370#

//코드 실행
//1 - 1, 3
solution("2022.05.19", ["A 6", "B 12", "C 3"], ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"]);
//2 - 1, 4, 5
solution("2020.01.01", ["Z 12", "D 5"], ["2019.01.01 D", "2019.11.15 Z", "2019.08.02 D", "2019.07.01 D", "2018.12.28 Z"]);

