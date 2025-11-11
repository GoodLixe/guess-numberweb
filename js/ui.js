// Модуль пользовательского интерфейса
class GameUI {
    constructor() {
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            stats: document.getElementById('stats-screen'),
            win: document.getElementById('win-screen')
        };

        this.elements = {
            playerName: document.getElementById('player-name'),
            startGame: document.getElementById('start-game'),
            currentPlayer: document.getElementById('current-player'),
            attemptCount: document.getElementById('attempt-count'),
            maxAttempts: document.getElementById('max-attempts'),
            guessInput: document.getElementById('guess-input'),
            submitGuess: document.getElementById('submit-guess'),
            feedbackMessage: document.getElementById('feedback-message'),
            attemptsList: document.getElementById('attempts-list'),
            newGame: document.getElementById('new-game'),
            showStats: document.getElementById('show-stats'),
            backToGame: document.getElementById('back-to-game'),
            playAgain: document.getElementById('play-again'),
            winNumber: document.getElementById('win-number'),
            winAttempts: document.getElementById('win-attempts'),
            statsContent: document.getElementById('stats-content')
        };

        this.initEventListeners();
    }

    // Инициализация обработчиков событий
    initEventListeners() {
        this.elements.startGame.addEventListener('click', () => this.onStartGame());
        this.elements.submitGuess.addEventListener('click', () => this.onSubmitGuess());
        this.elements.newGame.addEventListener('click', () => this.onNewGame());
        this.elements.showStats.addEventListener('click', () => this.onShowStats());
        this.elements.backToGame.addEventListener('click', () => this.onBackToGame());
        this.elements.playAgain.addEventListener('click', () => this.onPlayAgain());

        // Обработка нажатия Enter в поле ввода
        this.elements.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.onSubmitGuess();
            }
        });

        this.elements.playerName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.onStartGame();
            }
        });
    }

    // Переключение между экранами
    showScreen(screenName) {
        // Скрываем все экраны
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        // Показываем нужный экран
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
    }

    // Обновление информации об игре
    updateGameInfo(stats) {
        this.elements.currentPlayer.textContent = stats.playerName;
        this.elements.attemptCount.textContent = stats.currentAttempt;
        this.elements.maxAttempts.textContent = stats.maxAttempts;
    }

    // Отображение обратной связи
    showFeedback(attempt) {
        const feedback = this.elements.feedbackMessage;
        feedback.textContent = attempt.message;
        feedback.className = 'feedback'; // Сбрасываем классы

        if (attempt.result === 'more') {
            feedback.classList.add('more');
        } else if (attempt.result === 'less') {
            feedback.classList.add('less');
        } else if (attempt.result === 'win') {
            feedback.classList.add('win');
        }

        // Если игра окончена
        if (attempt.gameOver) {
            setTimeout(() => {
                this.showGameOver(attempt.finalMessage);
            }, 1000);
        }
    }

    // Обновление истории попыток
    updateAttemptsHistory(attempts) {
        const attemptsList = this.elements.attemptsList;
        attemptsList.innerHTML = '';

        attempts.forEach(attempt => {
            const attemptItem = document.createElement('div');
            attemptItem.className = 'attempt-item';
            
            attemptItem.innerHTML = `
                <span class="attempt-number">#${attempt.number}</span>
                <span class="attempt-guess">${attempt.guess}</span>
                <span class="attempt-result ${attempt.result}">
                    ${attempt.result === 'more' ? '⬆️ Больше' : 
                      attempt.result === 'less' ? '⬇️ Меньше' : 
                      '🎉 Угадал!'}
                </span>
            `;

            attemptsList.appendChild(attemptItem);
        });

        // Прокручиваем к последней попытке
        attemptsList.scrollTop = attemptsList.scrollHeight;
    }

    // Показать экран победы
    showWinScreen(secretNumber, attemptsCount) {
        this.elements.winNumber.textContent = secretNumber;
        this.elements.winAttempts.textContent = attemptsCount;
        this.showScreen('win');
    }

    // Показать экран окончания игры (проигрыш)
    showGameOver(message) {
        this.elements.feedbackMessage.textContent = message;
        this.elements.feedbackMessage.className = 'feedback more';
        
        // Через 3 секунды предлагаем новую игру
        setTimeout(() => {
            if (confirm(`${message}\n\nХотите начать новую игру?`)) {
                this.onNewGame();
            }
        }, 2000);
    }

    // Очистка полей ввода
    clearInputs() {
        this.elements.guessInput.value = '';
        this.elements.playerName.value = 'Игрок';
    }

    // Фокус на поле ввода
    focusGuessInput() {
        this.elements.guessInput.focus();
    }

    // Блокировка/разблокировка элементов управления
    setGameControlsEnabled(enabled) {
        this.elements.guessInput.disabled = !enabled;
        this.elements.submitGuess.disabled = !enabled;
    }

    // Показать статистику (заглушка)
    showStats() {
        this.elements.statsContent.innerHTML = `
            <div class="stats-placeholder">
                <p>📊 Статистика будет доступна после подключения базы данных</p>
                <p>В следующей лабораторной работе мы добавим сохранение игр в IndexedDB</p>
            </div>
        `;
        this.showScreen('stats');
    }

    // Колбэки для обработки событий (будут установлены из app.js)
    onStartGame() {}
    onSubmitGuess() {}
    onNewGame() {}
    onShowStats() {}
    onBackToGame() {}
    onPlayAgain() {}
}