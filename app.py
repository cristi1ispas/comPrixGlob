import os
import flask
import psycopg
from flask import Flask, flash, redirect, render_template, request, session

app = Flask(__name__)

conn = psycopg.connect(
        dbname = "snacks",
        user = "postgres",
        password = "FaggotNiggers67",
        host = "localhost",
        port = "5432"
)

@app.route("/")
def index():
        return render_template("index.html")


@app.route("/chips")
def chips():
        
        brands_for_filter = get_brands_for_category(1)
        flavors_for_filter = get_flavors_for_category(1)

        products = get_products(
                category_id=1,
                brands=request.args.getlist("brand"),
                flavors=request.args.getlist("flavor"),
                min_price=request.args.get("min_price", type=float),
                max_price=request.args.get("max_price", type=float),
                price_order=request.args.get("price_order", type=int)
        )
        for flavor in flavors_for_filter:
                print(flavor) 

        return render_template("chips.html", products=products, brands = brands_for_filter, flavors = flavors_for_filter)

@app.route("/crackers")
def crackers():

        brands_for_filter = get_brands_for_category(2)
        
        products = get_products(
                category_id=2,
                brands=request.args.getlist("brand"),
                min_price=request.args.get("min_price", type=float),
                max_price=request.args.get("max_price", type=float),
                price_order=request.args.get("price_order", type=int)
        )
        return render_template("crackers.html", products=products, brands = brands_for_filter)

@app.route("/sodas")
def sodas():

        brands_for_filter = get_brands_for_category(3)

        products = get_products(
                category_id=3,
                brands=request.args.getlist("brand"),
                min_price=request.args.get("min_price", type=float),
                max_price=request.args.get("max_price", type=float),
                price_order=request.args.get("price_order", type=int)
        )

        return render_template("sodas.html", products=products, brands = brands_for_filter)

@app.route("/beverages")
def beverages():

        brands_for_filter = get_brands_for_category(4)
        
        products = get_products(
                category_id=4,
                brands=request.args.getlist("brand"),
                min_price=request.args.get("min_price", type=float),
                max_price=request.args.get("max_price", type=float),
                price_order=request.args.get("price_order", type=int)
        )

        return render_template("beverages.html", products=products, brands = brands_for_filter)

@app.route("/sweets")
def sweets():

        brands_for_filter = get_brands_for_category(5)
        
        products = get_products(
                category_id=5,
                brands=request.args.getlist("brand"),
                min_price=request.args.get("min_price", type=float),
                max_price=request.args.get("max_price", type=float),
                price_order=request.args.get("price_order", type=int)
        )

        return render_template("sweets.html", products=products, brands = brands_for_filter)

@app.route("/fasting")
def fasting():
        
        brands_for_filter = get_brands_for_category(6)
        
        products = get_products(
                category_id=6,
                brands=request.args.getlist("brand"),
                min_price=request.args.get("min_price", type=float),
                max_price=request.args.get("max_price", type=float),
                price_order=request.args.get("price_order", type=int)
        )

        return render_template("fasting.html", products=products, brands = brands_for_filter)



@app.route("/grill")
def grill():
        
        brands_for_filter = get_brands_for_category(7)
        
        products = get_products(
                category_id=7,
                brands=request.args.getlist("brand"),
                min_price=request.args.get("min_price", type=float),
                max_price=request.args.get("max_price", type=float),
                price_order=request.args.get("price_order", type=int)
        )


        return render_template("grill.html", products=products, brands = brands_for_filter)









def get_brands_for_category(category_id):
        with conn.cursor() as cur:
                cur.execute("""
                        SELECT DISTINCT brand 
                        FROM products 
                        WHERE category_id = %s
                        ORDER BY BRAND
                        """, (category_id,))
                return [row[0] for row in cur.fetchall()]
        

def get_flavors_for_category(category_id):
        with conn.cursor() as cur:
                cur.execute("""
                        SELECT DISTINCT flavor
                            FROM products
                            WHERE category_id = %s
                            ORDER BY FLAVOR
                            """, (category_id,))
                return [row[0] for row in cur.fetchall()]


def get_products(category_id, brands = None, flavors = None, min_price = None, max_price = None, price_order = None):
        query = """
                SELECT p.id, p.name, pr.price, p.brand, p.flavor
                FROM products p
                LEFT JOIN prices pr ON pr.product_id = p.id
                WHERE p.category_id = %s
        """
        params = [category_id]

        if brands:
                placeholders = ", ".join(["%s"] * len(brands))
                query += f" AND p.brand IN ({placeholders})"
                params.extend(brands)

        if flavors:
                placeholders = ", ".join(["%s"] * len(flavors))
                query += f" AND p.flavor IN ({placeholders})"
                params.extend(flavors)

        if min_price is not None:
                query += " AND pr.price >= %s"
                params.append(min_price)

        if max_price is not None:
                query += " AND pr.price <= %s"
                params.append(max_price)

        '''if name:
                query += " AND p.name ILIKE %s"
                params.append(f"%{name}%")'''

        
        if price_order == 1:
                query += " ORDER BY pr.price ASC NULLS LAST"

        if price_order == -1:
                query += " ORDER BY pr.price DESC NULLS LAST"

        with conn.cursor() as cur:
                cur.execute(query, tuple(params))
                return [
            {
                "id": p[0],
                "name": p[1],
                "price": f"{p[2]:.2f}" if p[2] is not None else None,
                "brand": p[3],
                "flavor": p[4]
            }
            for p in cur.fetchall()
        ]