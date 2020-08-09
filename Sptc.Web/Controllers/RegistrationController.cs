using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sptc.Web.Context;
using Sptc.Web.Entity;

namespace Sptc.Web.Controllers
{
    public class RegistrationController : Controller
    {
        public SptcDbContext _context { get; }

        // GET: Registration
        public RegistrationController(SptcDbContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View();
        }

        // GET: Registration/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Registration/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Registration/Create
        [HttpPost] 
        public ActionResult Create([FromBody] Registration registration)
        {

            try
            {
                registration.DateCreated = DateTime.Now;
                registration.DateUpdated = DateTime.Now;
                registration.RegistrationStatus = RegistrationStatus.Pending;

                _context.Registration.Add(registration);
                _context.SaveChanges();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message); 
            }

            return Ok(1);
        }

        // GET: Registration/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Registration/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Registration/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Registration/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}