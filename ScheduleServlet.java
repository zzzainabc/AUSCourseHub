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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/ScheduleServlet")
public class ScheduleServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // GET:
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;

        if (userId == null) {
            response.sendRedirect("login.html");
            return;
        }

        StringBuilder scheduleData = new StringBuilder("[");
        try (Connection conn = DBConnection.getConnection()) {
            String sql = "SELECT * FROM UserSchedules WHERE user_id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            ResultSet rs = ps.executeQuery();
            
            while (rs.next()) {
                scheduleData.append(String.format (
                    "{\"id\":\"%d\",\"courseName\":\"%s\",\"courseCode\":\"%s\",\"courseType\":\"%s\",\"days\":\"%s\",\"startTime\":\"%s\",\"room\":\"%s\"},",
                    rs.getInt("id"), 
                    rs.getString("course_name"), 
                    rs.getString("course_code"), 
                    rs.getString("course_type"), 
                    rs.getString("days"), 
                    rs.getString("start_time"),
                    rs.getString("room")
                ));
            }
            
            if (scheduleData.length() > 1) {
                scheduleData.setLength(scheduleData.length() - 1);
            }
        } catch (Exception e) { 
            e.printStackTrace(); 
        }
        scheduleData.append("]");

        response.setContentType("text/html");
        try (InputStream is = getServletContext().getResourceAsStream("/schedule.html");
             BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            
            if (is == null) {
                response.getWriter().println("Error: schedule.html not found");
                return;
            }

            String line;
            while ((line = br.readLine()) != null) {
                if (line.contains("const savedClasses = [];")) {
                    line = "const savedClasses = " + scheduleData.toString() + ";";
                }
                
                if (session != null && session.getAttribute("userName") != null) {
                    line = line.replace("Dana Dghaym", (String)session.getAttribute("userName"));
                }
                
                response.getWriter().println(line);
            }
        }
    }
    
    // POST: Filling table
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;

        if (userId == null) {
            response.sendRedirect("login.html");
            return;
        }

        String name = request.getParameter("courseName");
        String code = request.getParameter("courseCode");
        String type = request.getParameter("courseType");
        String time = request.getParameter("startTime");
        String room = request.getParameter("room");
        String[] daysArray = request.getParameterValues("days");
        String classDays = (daysArray != null) ? String.join(", ", daysArray) : "";

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "INSERT INTO UserSchedules (user_id, course_name, course_code, course_type, days, start_time, room) VALUES (?,?,?,?,?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            ps.setString(2, name);
            ps.setString(3, code);
            ps.setString(4, type);
            ps.setString(5, classDays); 
            ps.setString(6, time);
            ps.setString(7, room);
            ps.executeUpdate();
        } 
        
        catch (Exception e) {
            e.printStackTrace();
        }

        response.sendRedirect("ScheduleServlet");
    }
}