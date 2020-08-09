using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sptc.Web.Entity;

namespace Sptc.Web.Context
{
    public class SptcDbContext : DbContext
    {

        public SptcDbContext()
        {

        }
        public SptcDbContext(DbContextOptions<SptcDbContext> options) : base(options) { }

        public DbSet<Registration> Registration { get; set; }
    }
}
