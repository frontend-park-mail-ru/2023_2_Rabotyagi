# 2023_2_Rabotyagi
Frontend репозиторий команды Работяги  

## Приложение
- [Prod](https://goods-galaxy.ru/)
- [Dev](http://dev.goods-galaxy.ru/)

## Наши контакты:

- Владислав Ильинский: 
    - [git](https://github.com/Vilinvil)
    - [telegram](https://t.me/Vilin0)

- Никита Демирев:
    - [git](https://github.com/NickDemiman)
    - [telegram](https://t.me/NikDemiman)

- Алексей Красноперов:
    - [git](https://github.com/SanExpett)
    - [telegram](https://t.me/SanExpet)

- Таня Емельянова:
    - [git](https://github.com/TanyaEmka)
    - [telegram](https://t.me/jupi_abri)

## [Репа бек](https://github.com/go-park-mail-ru/2023_2_Rabotyagi)

## [Фигма](https://www.figma.com/file/YLSZ9uY9gVn6bMDJchrEzD?node-id=23:2127&mode=design#567544444)

## Запуск локально
```bash
    npm run build-[dev|prod]
    npm run server
```

# Docker image build

## Local

Из корня проекта прописываем
```shell
docker build -t nikdemi/rabotyagi-backend:latest .
```

Далее, чтобы убедиться что image забилдился, прописываем:
```shell
docker images
```

Должны увидеть следующее:
```d
REPOSITORY                  TAG       IMAGE ID       CREATED          SIZE
nikdemi/rabotyagi-backend   latest    25dbaeeef1af   50 seconds ago   307MB
```

## Запуск контейнера

`docker run -p 3000:3000 nikdemi/rabotyagi-backend:rk1-test`

