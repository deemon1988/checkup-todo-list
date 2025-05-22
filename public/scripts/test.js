// async function* generator() {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   yield 1;
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   yield 2;
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   yield 3;
// }

// const gen = generator();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

function getArrayParams(...arr) {
  let max = arr[0];
  let min = arr[0];

  const res = arr.reduce((acc, num, index, arr) => {
    acc += num;
    min = num < min ? num : min;
    max = num > max ? num : max;
    if (index === arr.length - 1) {
      return {
        max: max,
        min: min,
        avg: Number(acc / arr.length).toFixed(2),
      };
    } else {
      return acc;
    }
  });
  return res;
}

class Students {
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5 || !Number.isInteger(mark)) {
      console.log('Недопустимое значение');
      return;
    }
    const existSubject = Object.keys(this.marks).find(
      (subj) => subj === subject,
    );

    if (existSubject) {
      this.marks[existSubject].push(mark);
    } else {
      this.marks[subject] = [mark];
    }
  }

  getAverageBySubject(subject) {
    if (this.marks[subject] === undefined) return 0;
    const subjectMarks = this.marks[subject];
    const avgMark = subjectMarks.reduce((acc, mark, index) => {
      acc += mark;
      if (index === subjectMarks.length - 1) {
        return Number((acc / subjectMarks.length).toFixed(2));
      } else {
        return acc;
      }
    });
    console.log(`Средняя оценка по предмету ${subject}:`, avgMark);
    return avgMark;
  }

  getAverage() {
    let totalSum = 0;
    const marksKeys = Object.keys(this.marks);
    marksKeys.forEach((subj) => {
      totalSum += this.getAverageBySubject(subj);
    });
    const totalAvgMark = Number((totalSum / marksKeys.length).toFixed(2));
    console.log('Общая средняя по всем предметам:', totalAvgMark);
    return totalAvgMark;
  }
}

function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.marks = [];
}

let alex = new Student('Alex', 'male', 26);
let bob = new Student('Bob', 'male', 30);
let mike = new Student('Mike', 'male', 36);

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
};
Student.prototype.addMarks = function (...marksToAdd) {
  if (!this.marks || !this.subject) {
    console.log('Студент не числится не по одному предмету');
    return;
  } else if (!marksToAdd.every(Number) || !marksToAdd) {
    console.log('Оценки должны быть числа');
    return;
  }
  this.marks = marksToAdd;
};

Student.prototype.getAverage = function () {
  if (!this.marks || this.marks.length === 0) return 0;
  return this.marks.reduce((acc, mark, index) => {
    acc += mark;
    if (index === this.marks.length - 1) {
      return Number(acc / this.marks.length).toFixed(2);
    } else {
      return acc;
    }
  }, 0);
};

Student.prototype.exclude = function (reason) {
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
};

// alex.setSubject('math');
// alex.addMarks(1, 2, 3);
// console.log(bob.getAverage());

// Object.entries(alex).forEach((prop) => console.log(prop));
// console.log();
// alex.exclude('academic failure');
// Object.entries(alex).forEach((prop) => console.log(prop));
// console.log();

class PrintEditionItem {
  #state;
  #type;
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.#state = 100;
    this.#type = null;
  }
  fix() {
    if (!this.#state == 0 || !this.#state == 100) {
      this.state = this.#state * 1.5;
    }
  }
  set state(state) {
    this.#state = state < 0 ? 0 : state > 100 ? 100 : state;
  }

  get state() {
    return this.#state;
  }

  set type(type) {
    this.#type = type;
  }

  get type() {
    return this.#type;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

const sherlock = new PrintEditionItem(
  'Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе',
  2019,
  1008,
);

const picknick = new FantasticBook(
  'Аркадий и Борис Стругацкие',
  'Пикник на обочине',
  1972,
  168,
);

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }
  addBook(book) {
    if (!(book instanceof PrintEditionItem)) return;

    if (book.state > 30) {
      this.books.push(book);
    } else {
      console.log('Издание в плохом состоянии');
      return;
    }
  }

  findBookBy(type, value) {
    const finderBook = this.books.find((book) => book[type] === value);
    if (!finderBook) return null;
    return finderBook;
  }

  giveBookByName(bookName) {
    const finderBook = this.books.find((book) => book.name === bookName);
    if (!finderBook) return null;
    this.books.splice(this.books.indexOf(finderBook), 1);
    return finderBook;
  }
}

const library = new Library('Библиотека имени Ленина');

library.addBook(
  new DetectiveBook(
    'Артур Конан Дойл',
    'Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе',
    2019,
    1008,
  ),
);
library.addBook(
  new FantasticBook(
    'Аркадий и Борис Стругацкие',
    'Пикник на обочине',
    1972,
    168,
  ),
);

function parseCount(number) {
  const parseNumber = Number.parseFloat(number);
  if (Number.isNaN(parseNumber)) {
    throw new Error('Невалидное значение');
  } else return parseNumber;
}

function validateCount(number) {
  try {
    return parseCount(number);
  } catch (error) {
    return error.message;
  }
}

console.log(validateCount('dasd'));

class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
    this.ringingId = null;
  }

  addClock(setTimer, setCallback) {
    if (!setTimer || !setCallback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }
    if (this.alarmCollection.find((existTimer) => existTimer === setTimer)) {
      console.warn('Уже присутствует звонок на это же время');
    }
    this.alarmCollection.push({
      callback: setCallback,
      time: setTimer,
      canCall: true,
    });
  }

  removeClock(removedTime) {
    this.alarmCollection.splice(removedTime, 1);
  }

  getCurrentFormattedTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
  }

  start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(
      () =>
        this.alarmCollection.forEach((alarm) => {
          if (
            alarm.time === this.getCurrentFormattedTime() &&
            alarm.canCall === true
          ) {
            alarm.canCall = false;
            this.ringingId = setInterval(() => {
              alarm.callback();
            }, 1000);
            // console.log(this.intervalId);
            setTimeout(() => {
              this.stop(this.intervalId, this.ringingId);
              console.log('Будильник остановлен');
            }, 3000);
          }
        }),
      1000,
    );
  }

  stop(intervalId, ringingId) {
    clearInterval(intervalId);
    clearInterval(ringingId);
    intervalId = null;
    ringingId = null;
  }
}

alarm = new AlarmClock();
console.log(alarm.getCurrentFormattedTime());
alarm.addClock('2:10', () => {
  console.log('Будильник');
});

alarm.start();
