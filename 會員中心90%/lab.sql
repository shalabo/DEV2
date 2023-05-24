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