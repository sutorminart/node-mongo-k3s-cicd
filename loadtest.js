import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // Сценарий нагрузки
  stages: [
    { duration: '30s', target: 500 },  // Разгон: за 30 сек поднимаем до 50 пользователей
    { duration: '1m', target: 500 },   // Плато: держим 50 пользователей 1 минуту
    { duration: '10s', target: 0 },   // Остывание: плавно снижаем до 0
  ],
  // Игнорируем ошибки сертификатов (если вдруг возникнут)
  insecureSkipTLSVerify: true,
};

export default function () {
  // Стучимся на главную страницу (Punycode вашего домена)
  // const res = http.get('https://xn--e1adiecfr5a5he.xn--p1ai');

  const res = http.get('https://xn--e1adiecfr5a5he.xn--p1ai/data');
  
  // Проверяем, что сервер ответил 200 OK
  check(res, { 'status was 200': (r) => r.status == 200 });
  
  sleep(1);
}