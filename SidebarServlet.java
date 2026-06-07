import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

/**
 * Servlet implementation class SidebarServlet
 */
@WebServlet("/SidebarServlet")
public class SidebarServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        String userName = (session != null) ? (String) session.getAttribute("userName") : null;

        if (userName == null) {
            response.sendRedirect("login.html");
            return;
        }
        
        // load page from url parameter
        String page = request.getParameter("page");
        if (page == null) page = "homepage"; // Default

        String fileName = page + ".html";
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try (InputStream is = getServletContext().getResourceAsStream("/" + fileName);
             BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            
            if (is == null) {
                response.sendRedirect("UsersServlet"); // Fallback to dashboard
                return;
            }

            String line;
            while ((line = br.readLine()) != null) {
                // Replace placeholders on EVERY page
                line = line.replace("Dana Dghaym", userName);
                line = line.replace("HELLO, Dana!", "HELLO, " + userName + "!");
                out.println(line);
            }
        }
    }
}
