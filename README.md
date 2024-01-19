Курсовой проект Московский политех. 
Стек технологий: Next.js, mobx, css, prisma, python, postgresql

## Инструкция по локальному запуску

1. Установить пакетные зависимости `npm install`
2. Запустить сервер для базы данных postgresql
* Может быть полезным
  - https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html
  - https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/
3. Создать файл .env с переменными окружения
```env
POSTGRES_PRISMA_URL="" # для подключения к бд в prisma
NEXT_PUBLIC_API_URL="localhost:3000" # адрес сервера для получения/отправки данных
PROTOCOL="http" # изменить на https при использовании сервера с сертификатом ssl
UNSPLASH_API_KEY="" # API ключ для получения изображений из сервиса Unsplash
# https://unsplash.com/documentation
USE_PYTHON_SERVER="true" # для использования самостоятельного python сервера
```
4. При использовании python сервера:
    - Создать в директории /server файл .env
    ```env
    POSTGRES_URL="" # адрес postgresql сервера
    ```
    - Установить pyenv для управления версиями python и виртуальным окружением (https://github.com/pyenv/pyenv)
    - Создать и активировать виртуальное окружение\
    `pyenv exec python -m venv server/.venv`\
    `pyenv activate server/.venv/bin/activate`
    - Запустить окружение `source server/.venv/bin/activate`
    - Установить зависимости `pip install -r server/requirements.txt`
    - Выбрав нужный интерпретатор из виртуального окружения, запустить flask сервер `python server/run.py`
    ##### Для упрощения установки/запуска открыть папку /server в отдельном окне
5. Для запуска проекта в **development** режиме `npm run dev`
6. Для запуска в режиме **production**
- создать оптимизированную сборку `npm run build`
- запустить сервер `npm start`

#### Больше информации по разработке/запуску/сборке на https://nextjs.org/

#### Развернутое приложение доступно по ссылке https://task-distribution-service.vercel.app/
