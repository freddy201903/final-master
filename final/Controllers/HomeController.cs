using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using final.Models;

namespace final.Controllers
{
    
    public class HomeController : Controller
    {
        SpacepingpongDatabaseEntities db = new SpacepingpongDatabaseEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        // GET: Home/Login
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(string Account, string Password)
        {
            //取得帳密 指定給member
            var member = db.Members
                .Where(m => m.Account == Account && m.Password == Password)
                .FirstOrDefault();
            //var query = from o in db.Members
            //            where (o.Account == Account && o.Password == Password)
            //            select o;
            //Member member = query.FirstOrDefault();

            //會員未註冊
            if (member == null)
            {
                ViewBag.Message = "帳密錯誤，請重新輸入";
                return View();
            }
            Session["Welcome"] = member.UserName;
            Session["Member"] = member;
            return RedirectToAction("Index");
        }
        public ActionResult game()
        {
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(
            string name, string account, string password, string email, string phone, string address
            //Member newmember
            )
        {
            //var member = db.Members
            //    .Where(m => m.Account == account)
            //    .FirstOrDefault();
            var query = from o in db.Members
                        where o.Account == account
                        select o;
            Member member = query.FirstOrDefault();
            if (member == null)
            {
                Member newmember = new Member();
                
                newmember.UserName = name;
                newmember.Account = account;
                newmember.Password = password;
                newmember.Email = email;
                newmember.PhoneNumber = phone;
                newmember.Address = address;
                //newmember.Points = 0;
                //newmember.Diamonds = 0;
                //newmember.Victories = 0;
                //newmember.PersonID = null;

                db.Members.Add(newmember);
                
                    db.SaveChanges();
                    return RedirectToAction("Login");
            }
            else {
                ViewBag.Message = "此帳號已有人使用";
                return View();
            }
            
        }
    }
}