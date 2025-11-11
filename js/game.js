// Модуль игровой логики
class Game {
    constructor() {
        this.secretNumber = 0;
        this.attempts = [];
        this.maxAttempts = 10;
        this.playerName = 'Игрок';
        this.isGameActive = false;
    }

    // Начать новую игру
    startNewGame(playerName = 'Игрок') {
        this.secretNumber = this.generateSecretNumber();
        this.attempts = [];
        this.playerName = playerName;
        this.isGameActive = true;
        
        console.log(`Новая игра для ${playerName}. Загаданное число: ${this.secretNumber}`);
        return {
            secretNumber: this.secretNumber,
            playerName: this.playerName,
            maxAttempts: this.maxAttempts
        };
    }

    // Сгенерировать случайное число
    generateSecretNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Сделать попытку угадать число
    makeGuess(guess) {
        if (!this.isGameActive) {
            throw new Error('Игра не активна');
        }

        const guessNumber = parseInt(guess);
        
        if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
            throw new Error('Пожалуйста, введите число от 1 до 100');
        }

        const attemptNumber = this.attempts.length + 1;
        let result, message;

        if (guessNumber < this.secretNumber) {
            result = 'more';
            message = 'Загаданное число БОЛЬШЕ';
        } else if (guessNumber > this.secretNumber) {
            result = 'less';
            message = 'Загаданное число МЕНЬШЕ';
        } else {
            result = 'win';
            message = 'Поздравляем! Вы угадали число!';
            this.isGameActive = false;
        }

        // Сохраняем попытку
        const attempt = {
            attemptNumber: attemptNumber,
            guess: guessNumber,
            result: result,
            message: message,
            timestamp: new Date().toISOString()
        };

        this.attempts.push(attempt);

        // Проверяем превышение лимита попыток
        if (attemptNumber >= this.maxAttempts && result !== 'win') {
            this.isGameActive = false;
            return {
                ...attempt,
                gameOver: true,
                finalMessage: `Игра окончена! Загаданное число было: ${this.secretNumber}`
            };
        }

        return attempt;
    }

    // Получить текущую статистику игры
    getGameStats() {
        return {
            playerName: this.playerName,
            secretNumber: this.secretNumber,
            attempts: this.attempts,
            currentAttempt: this.attempts.length,
            maxAttempts: this.maxAttempts,
            isGameActive: this.isGameActive,
            isGameWon: this.attempts.some(attempt => attempt.result === 'win')
        };
    }

    // Получить историю попыток
    getAttemptsHistory() {
        return this.attempts.map(attempt => ({
            number: attempt.attemptNumber,
            guess: attempt.guess,
            result: attempt.result,
            message: attempt.message
        }));
    }

    // Получить подсказку (для отладки)
    getHint() {
        return this.secretNumber;
    }

    // Сбросить игру
    resetGame() {
        this.secretNumber = 0;
        this.attempts = [];
        this.isGameActive = false;
    }
}

// Экспортируем класс для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
}