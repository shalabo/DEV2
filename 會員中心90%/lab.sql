---
SELECT personal.nickname, personal.phone, product.city, product.product_detail
FROM membercenter.personal 
INNER JOIN product_page.product 
ON personal.username=product.user_name;
---
SELECT personal.nickname, personal.phone, product.city, product.product_detail 
FROM membercenter.personal 
INNER JOIN product_page.product 
ON product.user_name=personal.username 
AND product.user_name='test1234';
---
SELECT * FROM membercenter.personal 
INNER JOIN product_page.product 
ON product.user_name=personal.username 
AND product.user_name='test1234';
---
SELECT memberid, product, product2, DATE_FORMAT(time, '%Y/%m/%d %H:%i')time FROM membercenter.record 
INNER JOIN membercenter.personal 
ON record.memberid=personal.username 
AND record.id2='test1234';

SELECT memberid, product, product2, success, DATE_FORMAT(time, '%Y/%m/%d %H:%i')time FROM membercenter.record WHERE id2 = ?


SELECT id1, product, product2, DATE_FORMAT(time, '%Y/%m/%d %H:%i')time FROM membercenter.record INNER JOIN membercenter.personal ON record.id1=personal.username AND record.id2='test1234';